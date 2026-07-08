---
type: concept
title: "Frontend Architecture — Flutter & React/Next.js"
source: /04_technical_architecture/frontend_architecture_flutter_react/
path: /04_technical_architecture/frontend_architecture_flutter_react/
updated: 2026-07-07
okf:
  generated_by: "@docmd/plugin-okf"
  generated_at: "2026-07-07T15:59:27.362Z"
---
# Frontend Architecture — Flutter & React/Next.js
**AI Learning & Member Management Platform — LearnFlow AI**
**Version:** 1.0 | **Date:** July 2026

---

## 1. Architecture Overview

LearnFlow AI uses a **dual-frontend architecture**:
- **Flutter** — Mobile apps (iOS, Android) and tablet apps (iPad, Android tablet)
- **React / Next.js** — Web app (browser), Desktop app (Electron), Marketing website

Both share the same backend APIs, design tokens, and business logic contracts, ensuring a consistent product experience across platforms.

---

## 2. Flutter Architecture (iOS, Android, iPad, Tablet)

### 2.1 Architecture Pattern
LearnFlow AI's Flutter app follows the **Clean Architecture** pattern with **Riverpod** state management, organized into three layers:

```
lib/
├── core/                        # Shared utilities, constants, theme
│   ├── constants/               # App constants, API endpoints, routes
│   ├── errors/                  # Failure classes, exception handling
│   ├── network/                 # Dio HTTP client, interceptors
│   ├── theme/                   # Design tokens, color scheme, typography
│   ├── utils/                   # Date helpers, validators, formatters
│   └── widgets/                 # Shared/atomic reusable widgets
│
├── features/                    # Feature modules (vertical slices)
│   ├── auth/
│   │   ├── data/
│   │   │   ├── datasources/     # Remote (API) and Local (SharedPrefs/Hive)
│   │   │   └── repositories/    # Implements domain repository interface
│   │   ├── domain/
│   │   │   ├── entities/        # Auth user entity
│   │   │   ├── repositories/    # Abstract interface
│   │   │   └── usecases/        # Login, Register, Logout, RefreshToken
│   │   └── presentation/
│   │       ├── providers/       # Riverpod providers and notifiers
│   │       ├── screens/         # LoginScreen, RegisterScreen, OTPScreen
│   │       └── widgets/         # AuthForm, SocialLoginButton, OTPInput
│   │
│   ├── dashboard/
│   ├── courses/
│   ├── lesson_player/
│   ├── quiz/
│   ├── ai_assistant/
│   ├── gamification/
│   ├── membership/
│   ├── payments/
│   ├── notifications/
│   ├── support/
│   ├── profile/
│   └── admin/                   # Tablet-only admin panel (conditional rendering)
│
├── app.dart                     # MaterialApp / CupertinoApp root
└── main.dart                    # Entry point, ProviderScope
```

### 2.2 State Management — Riverpod

All state is managed via `flutter_riverpod` with `AsyncNotifier` and `Notifier`:

```dart
// Example: Auth state
@riverpod
class AuthNotifier extends _$AuthNotifier {
  @override
  Future<AuthState> build() async {
    return await _checkExistingSession();
  }

  Future<void> login(String email, String password) async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(() async {
      final user = await ref.read(authRepositoryProvider).login(email, password);
      return AuthState.authenticated(user);
    });
  }

  Future<void> logout() async {
    await ref.read(authRepositoryProvider).logout();
    state = AsyncData(AuthState.unauthenticated());
  }
}
```

### 2.3 Dependency Injection
Using Riverpod providers as DI container:
```dart
// Repository provider
@riverpod
AuthRepository authRepository(AuthRepositoryRef ref) {
  return AuthRepositoryImpl(
    remoteDataSource: ref.watch(authRemoteDataSourceProvider),
    localDataSource: ref.watch(authLocalDataSourceProvider),
    networkInfo: ref.watch(networkInfoProvider),
  );
}

// HTTP Client
@riverpod
Dio dioClient(DioClientRef ref) {
  final dio = Dio(BaseOptions(baseUrl: AppConstants.apiBaseUrl));
  dio.interceptors.add(AuthInterceptor(ref));
  dio.interceptors.add(LoggingInterceptor());
  dio.interceptors.add(RetryInterceptor(dio));
  return dio;
}
```

### 2.4 Navigation — GoRouter
```dart
final routerProvider = Provider<GoRouter>((ref) {
  final authState = ref.watch(authNotifierProvider);
  return GoRouter(
    initialLocation: '/',
    redirect: (context, state) {
      final isLoggedIn = authState.valueOrNull?.isAuthenticated ?? false;
      final isAuthRoute = state.fullPath?.startsWith('/auth') ?? false;
      if (!isLoggedIn && !isAuthRoute) return '/auth/login';
      if (isLoggedIn && isAuthRoute) return '/dashboard';
      return null;
    },
    routes: [
      GoRoute(path: '/', redirect: (_, __) => '/dashboard'),
      GoRoute(path: '/auth/login', builder: (ctx, _) => const LoginScreen()),
      GoRoute(path: '/auth/register', builder: (ctx, _) => const RegisterScreen()),
      GoRoute(path: '/auth/otp', builder: (ctx, state) => OTPScreen(email: state.extra as String)),
      ShellRoute(
        builder: (ctx, state, child) => MainShell(child: child),
        routes: [
          GoRoute(path: '/dashboard', builder: (ctx, _) => const DashboardScreen()),
          GoRoute(path: '/courses', builder: (ctx, _) => const CourseListScreen()),
          GoRoute(
            path: '/courses/:id',
            builder: (ctx, state) => CourseDetailScreen(courseId: state.pathParameters['id']!),
          ),
          GoRoute(
            path: '/courses/:courseId/lessons/:lessonId',
            builder: (ctx, state) => LessonPlayerScreen(
              courseId: state.pathParameters['courseId']!,
              lessonId: state.pathParameters['lessonId']!,
            ),
          ),
          GoRoute(path: '/ai-assistant', builder: (ctx, _) => const AIAssistantScreen()),
          GoRoute(path: '/progress', builder: (ctx, _) => const ProgressScreen()),
          GoRoute(path: '/profile', builder: (ctx, _) => const ProfileScreen()),
          GoRoute(path: '/membership', builder: (ctx, _) => const MembershipScreen()),
        ],
      ),
    ],
  );
});
```

### 2.5 Network Layer — Dio with Interceptors
```dart
class AuthInterceptor extends Interceptor {
  final ProviderRef ref;
  AuthInterceptor(this.ref);

  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
    final token = ref.read(secureStorageProvider).getAccessToken();
    if (token != null) {
      options.headers['Authorization'] = 'Bearer $token';
    }
    super.onRequest(options, handler);
  }

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) async {
    if (err.response?.statusCode == 401) {
      // Attempt refresh token
      final refreshed = await ref.read(authRepositoryProvider).refreshToken();
      if (refreshed) {
        // Retry original request
        return handler.resolve(await ref.read(dioClientProvider).fetch(err.requestOptions));
      } else {
        ref.read(authNotifierProvider.notifier).logout();
      }
    }
    super.onError(err, handler);
  }
}
```

### 2.6 Offline Support
```dart
// Using Hive for local cache + connectivity package
class CourseRepositoryImpl implements CourseRepository {
  final CourseRemoteDataSource remote;
  final CourseLocalDataSource local;
  final NetworkInfo networkInfo;

  @override
  Future<Either<Failure, List<Course>>> getCourses() async {
    if (await networkInfo.isConnected) {
      try {
        final courses = await remote.getCourses();
        await local.cacheCourses(courses);
        return Right(courses);
      } on ServerException catch (e) {
        return Left(ServerFailure(e.message));
      }
    } else {
      return Right(await local.getCachedCourses());
    }
  }
}
```

### 2.7 Adaptive Layout (Flutter for iPad/Tablet)
```dart
class MainShell extends ConsumerWidget {
  final Widget child;
  const MainShell({required this.child, super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isTablet = MediaQuery.of(context).size.shortestSide > 600;
    return isTablet
        ? TabletScaffold(child: child)    // Sidebar nav
        : MobileScaffold(child: child);   // Bottom tab nav
  }
}
```

### 2.8 Video Player
```
Package: better_player or media_kit
Features:
- HLS adaptive streaming (quality auto-selection)
- Picture-in-picture (iOS native PiP API)
- Background audio playback
- Download to local (encrypted with flutter_secure_storage key)
- Custom controls overlay (Framer-motion-equivalent: AnimatedOpacity, TweenAnimationBuilder)
- Caption/subtitle rendering (VTT format)
- Playback speed: 0.5x, 0.75x, 1x, 1.25x, 1.5x, 2x
```

### 2.9 Key Flutter Packages
```yaml
dependencies:
  flutter_riverpod: ^2.5.1
  riverpod_annotation: ^2.3.5
  go_router: ^14.0.0
  dio: ^5.4.3
  hive_flutter: ^1.1.0
  flutter_secure_storage: ^9.0.0
  better_player: ^0.0.85
  pdf: ^3.10.8
  share_plus: ^9.0.0
  firebase_messaging: ^15.0.0
  firebase_analytics: ^11.0.0
  firebase_crashlytics: ^4.0.0
  razorpay_flutter: ^1.3.6
  cached_network_image: ^3.3.1
  fl_chart: ^0.67.0
  lottie: ^3.1.0
  connectivity_plus: ^6.0.0
  image_picker: ^1.1.0
  permission_handler: ^11.3.0

dev_dependencies:
  riverpod_generator: ^2.4.0
  build_runner: ^2.4.9
  flutter_lints: ^4.0.0
  mocktail: ^1.0.3
```

---

## 3. React / Next.js Architecture (Web, Desktop, Electron)

### 3.1 Architecture Pattern
The web app uses **Next.js 14 App Router** with a **modular feature-slice** architecture:

```
src/
├── app/                              # Next.js App Router
│   ├── (auth)/                       # Route group (no shared layout)
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── otp/page.tsx
│   ├── (app)/                        # Authenticated app routes
│   │   ├── layout.tsx                # App shell with sidebar/topnav
│   │   ├── dashboard/page.tsx
│   │   ├── courses/
│   │   │   ├── page.tsx              # Course catalog
│   │   │   └── [id]/page.tsx         # Course detail
│   │   ├── learn/[courseId]/[lessonId]/page.tsx
│   │   ├── ai-assistant/page.tsx
│   │   ├── progress/page.tsx
│   │   ├── membership/page.tsx
│   │   ├── profile/page.tsx
│   │   └── admin/                    # Admin panel (role-gated)
│   │       ├── layout.tsx
│   │       ├── page.tsx              # Admin dashboard
│   │       ├── users/page.tsx
│   │       ├── courses/page.tsx
│   │       ├── revenue/page.tsx
│   │       └── notifications/page.tsx
│   ├── (marketing)/                  # Public marketing pages
│   │   ├── page.tsx                  # Home / Landing
│   │   ├── features/page.tsx
│   │   ├── pricing/page.tsx
│   │   └── about/page.tsx
│   ├── api/                          # API routes (Next.js API, used for SSR only)
│   ├── layout.tsx                    # Root layout (fonts, providers)
│   └── globals.css
│
├── features/                         # Feature modules
│   ├── auth/
│   │   ├── api.ts                    # Auth API calls (using fetch/axios)
│   │   ├── hooks.ts                  # useAuth, useSession hooks
│   │   ├── store.ts                  # Zustand auth store slice
│   │   └── components/              # LoginForm, RegisterForm, OTPInput
│   ├── courses/
│   ├── ai-assistant/
│   ├── gamification/
│   ├── membership/
│   └── admin/
│
├── components/                       # Shared/global UI components (design system)
│   ├── ui/                           # Primitive components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Toast.tsx
│   │   └── ...
│   ├── layout/                       # Layout components
│   │   ├── Sidebar.tsx
│   │   ├── TopNav.tsx
│   │   ├── BottomTabBar.tsx          # Mobile web tab bar
│   │   └── PageContainer.tsx
│   └── shared/                       # Domain-level shared components
│       ├── CourseCard.tsx
│       ├── LessonPlayer.tsx
│       ├── ProgressBar.tsx
│       └── CertificateCard.tsx
│
├── lib/                              # Utilities
│   ├── api-client.ts                 # Axios instance with interceptors
│   ├── auth.ts                       # Token management
│   ├── utils.ts                      # Common utilities
│   └── constants.ts
│
├── stores/                           # Zustand stores
│   ├── auth.store.ts
│   ├── ui.store.ts
│   └── quiz.store.ts
│
└── styles/                           # CSS modules + global styles
    ├── design-tokens.css
    └── components/
```

### 3.2 State Management — Zustand + TanStack Query

```typescript
// Auth store (Zustand)
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthStore {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      setAuth: (user, accessToken) => set({ user, accessToken, isAuthenticated: true }),
      logout: () => set({ user: null, accessToken: null, isAuthenticated: false }),
    }),
    { name: 'auth-store', storage: createJSONStorage(() => sessionStorage) }
  )
);

// Server state with TanStack Query
const { data: courses, isLoading, error } = useQuery({
  queryKey: ['courses', { category, page }],
  queryFn: () => coursesApi.getCourses({ category, page }),
  staleTime: 5 * 60 * 1000, // 5 minutes
});
```

### 3.3 Framer Motion Animations

```typescript
// Animation variants (shared library)
export const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: { opacity: 0, y: -12, transition: { duration: 0.2 } }
  },
  scalePop: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }
  },
  staggerContainer: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } }
  }
};

// Usage in Course Grid
<motion.div
  variants={variants.staggerContainer}
  initial="hidden"
  animate="visible"
  className="grid grid-cols-4 gap-6"
>
  {courses.map(course => (
    <motion.div key={course.id} variants={variants.fadeUp}>
      <CourseCard course={course} />
    </motion.div>
  ))}
</motion.div>
```

### 3.4 API Client
```typescript
import axios from 'axios';
import { useAuthStore } from '@/stores/auth.store';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

// Request interceptor: attach token
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor: handle 401 and refresh
apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const newToken = await authApi.refreshToken();
        useAuthStore.getState().setAccessToken(newToken);
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return apiClient.request(error.config);
      } catch {
        useAuthStore.getState().logout();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
```

### 3.5 Electron Desktop Packaging

```javascript
// electron/main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 768,
    titleBarStyle: 'hiddenInset',   // macOS native title bar
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    icon: path.join(__dirname, '../public/icon.png'),
  });

  const url = isDev 
    ? 'http://localhost:3000' 
    : `file://${path.join(__dirname, '../out/index.html')}`;
  
  mainWindow.loadURL(url);
}

app.on('ready', createWindow);

// IPC handlers for native features
ipcMain.handle('show-save-dialog', async (event, options) => {
  const { dialog } = require('electron');
  return await dialog.showSaveDialog(options);
});
```

```json
// package.json scripts for Electron
{
  "scripts": {
    "dev": "next dev",
    "build:web": "next build",
    "build:electron": "next build && next export -o out && electron-builder",
    "electron:dev": "concurrently \"next dev\" \"wait-on http://localhost:3000 && electron .\"",
    "dist:mac": "electron-builder --mac --publish never",
    "dist:win": "electron-builder --win --publish never"
  }
}
```

### 3.6 Key React/Next.js Packages
```json
{
  "next": "^14.2.0",
  "react": "^18.3.0",
  "framer-motion": "^11.2.0",
  "@radix-ui/react-dialog": "^1.1.0",
  "@radix-ui/react-dropdown-menu": "^2.1.0",
  "@radix-ui/react-tabs": "^1.1.0",
  "@radix-ui/react-toast": "^1.2.0",
  "@tanstack/react-query": "^5.45.0",
  "zustand": "^4.5.4",
  "axios": "^1.7.2",
  "lucide-react": "^0.400.0",
  "react-player": "^2.16.0",
  "react-pdf": "^9.0.0",
  "recharts": "^2.12.7",
  "@stripe/stripe-js": "^4.1.0",
  "react-hook-form": "^7.52.0",
  "zod": "^3.23.8",
  "date-fns": "^3.6.0",
  "socket.io-client": "^4.7.5",
  "electron": "^31.1.0",
  "electron-builder": "^24.13.3"
}
```

---

## 4. Shared Concerns

### 4.1 Responsive Breakpoints (CSS / Flutter)
| Breakpoint | CSS (min-width) | Flutter (shortestSide) |
|---|---|---|
| Mobile | 320px | < 600px |
| Tablet | 768px | 600–900px |
| Desktop S | 1024px | > 900px |
| Desktop L | 1280px | — |
| Wide | 1536px | — |

### 4.2 Design Token Integration

**CSS Variables (Web):**
```css
:root {
  --color-primary-500: #6366F1;
  --color-accent-emerald: #10B981;
  --color-neutral-900: #0F172A;
  --font-display: 'Outfit', sans-serif;
  --font-body: 'Inter', sans-serif;
  --radius-lg: 16px;
  --shadow-glass: 0 8px 32px rgba(0,0,0,0.37);
}
```

**Flutter ThemeData:**
```dart
final appTheme = ThemeData(
  colorScheme: ColorScheme.dark(
    primary: const Color(0xFF6366F1),
    secondary: const Color(0xFFA855F7),
    surface: const Color(0xFF1E1E2E),
    background: const Color(0xFF0F172A),
  ),
  textTheme: GoogleFonts.outfitTextTheme().merge(GoogleFonts.interTextTheme()),
  cardTheme: CardTheme(
    color: const Color(0xFF1E1E2E),
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
    elevation: 0,
  ),
);
```

### 4.3 Analytics Events (Both Platforms)
```
screen_view → { screen_name, screen_class, previous_screen }
course_enrolled → { course_id, course_name, price, method: 'free'|'paid'|'pro_plan' }
lesson_started → { lesson_id, course_id, lesson_type }
lesson_completed → { lesson_id, course_id, time_spent_seconds }
quiz_started → { quiz_id, course_id }
quiz_completed → { quiz_id, score, passed, time_taken }
ai_query_sent → { query_type, plan }
membership_viewed → {}
membership_subscribed → { plan, billing_cycle, amount }
badge_earned → { badge_id, badge_name }
level_up → { new_level, xp_total }
```
