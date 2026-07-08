'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Lead,
  Contact,
  Company,
  Institution,
  Recruiter,
  Student,
  Campaign,
  Task,
  Meeting,
  Activity,
  Invoice,
  Payment,
  AutomationWorkflow,
  seedLeads,
  seedContacts,
  seedCompanies,
  seedInstitutions,
  seedRecruiters,
  seedStudents,
  seedCampaigns,
  seedTasks,
  seedMeetings,
  seedActivities,
  seedInvoices,
  seedPayments,
  seedWorkflows
} from '@/lib/crmData';

interface CRMContextType {
  leads: Lead[];
  contacts: Contact[];
  companies: Company[];
  institutions: Institution[];
  recruiters: Recruiter[];
  students: Student[];
  campaigns: Campaign[];
  tasks: Task[];
  meetings: Meeting[];
  activities: Activity[];
  invoices: Invoice[];
  payments: Payment[];
  workflows: AutomationWorkflow[];
  
  // Action Handlers
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
  updateLeadStatus: (id: string, status: Lead['status']) => void;
  deleteLead: (id: string) => void;
  addContact: (contact: Omit<Contact, 'id' | 'addedAt'>) => void;
  addCompany: (company: Omit<Company, 'id' | 'joinedAt'>) => void;
  addInstitution: (inst: Omit<Institution, 'id'>) => void;
  updateInstitutionStatus: (id: string, status: Institution['status']) => void;
  addRecruiter: (rec: Omit<Recruiter, 'id' | 'lastActive'>) => void;
  updateStudentPlan: (id: string, plan: Student['planType']) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'status'>) => void;
  toggleTask: (id: string) => void;
  addMeeting: (meeting: Omit<Meeting, 'id' | 'status'>) => void;
  completeMeeting: (id: string) => void;
  addInvoice: (invoice: Omit<Invoice, 'id' | 'invoiceNumber' | 'issueDate' | 'taxAmount' | 'totalAmount'>) => void;
  updateInvoiceStatus: (id: string, status: Invoice['status']) => void;
  launchCampaign: (id: string) => void;
  toggleWorkflow: (id: string) => void;
  triggerWorkflowLive: (id: string) => void;
  logActivity: (type: Activity['type'], title: string, description: string, relatedTo?: string) => void;
  resetAllData: () => void;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

export const CRMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [workflows, setWorkflows] = useState<AutomationWorkflow[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const getStorage = <T,>(key: string, seed: T): T => {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : seed;
      };

      setLeads(getStorage('crm_leads', seedLeads));
      setContacts(getStorage('crm_contacts', seedContacts));
      setCompanies(getStorage('crm_companies', seedCompanies));
      setInstitutions(getStorage('crm_institutions', seedInstitutions));
      setRecruiters(getStorage('crm_recruiters', seedRecruiters));
      setStudents(getStorage('crm_students', seedStudents));
      setCampaigns(getStorage('crm_campaigns', seedCampaigns));
      setTasks(getStorage('crm_tasks', seedTasks));
      setMeetings(getStorage('crm_meetings', seedMeetings));
      setActivities(getStorage('crm_activities', seedActivities));
      setInvoices(getStorage('crm_invoices', seedInvoices));
      setPayments(getStorage('crm_payments', seedPayments));
      setWorkflows(getStorage('crm_workflows', seedWorkflows));
      
      setIsLoaded(true);
    }
  }, []);

  // Save to local storage on changes
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('crm_leads', JSON.stringify(leads));
      localStorage.setItem('crm_contacts', JSON.stringify(contacts));
      localStorage.setItem('crm_companies', JSON.stringify(companies));
      localStorage.setItem('crm_institutions', JSON.stringify(institutions));
      localStorage.setItem('crm_recruiters', JSON.stringify(recruiters));
      localStorage.setItem('crm_students', JSON.stringify(students));
      localStorage.setItem('crm_campaigns', JSON.stringify(campaigns));
      localStorage.setItem('crm_tasks', JSON.stringify(tasks));
      localStorage.setItem('crm_meetings', JSON.stringify(meetings));
      localStorage.setItem('crm_activities', JSON.stringify(activities));
      localStorage.setItem('crm_invoices', JSON.stringify(invoices));
      localStorage.setItem('crm_payments', JSON.stringify(payments));
      localStorage.setItem('crm_workflows', JSON.stringify(workflows));
    }
  }, [isLoaded, leads, contacts, companies, institutions, recruiters, students, campaigns, tasks, meetings, activities, invoices, payments, workflows]);

  // Helper log activity
  const logActivity = (type: Activity['type'], title: string, description: string, relatedTo?: string) => {
    const newAct: Activity = {
      id: `act_${Date.now()}`,
      type,
      title,
      description,
      timestamp: new Date().toISOString(),
      user: 'Super Admin',
      relatedTo
    };
    setActivities(prev => [newAct, ...prev]);
  };

  // Add a new Lead
  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt'>) => {
    const newLead: Lead = {
      ...leadData,
      id: `lead_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setLeads(prev => [newLead, ...prev]);
    logActivity('System', 'New Lead Added', `${newLead.name} (${newLead.company}) registered as a lead.`, newLead.company);
    
    // Automation trigger: When lead is created
    runWorkflowTrigger('Lead Created', newLead.name, newLead.company);
  };

  // Update Lead Status (Sales Pipeline update)
  const updateLeadStatus = (id: string, status: Lead['status']) => {
    setLeads(prev => prev.map(lead => {
      if (lead.id === id) {
        if (lead.status !== status) {
          logActivity('System', 'Lead Stage Changed', `${lead.name}'s status updated from ${lead.status} to ${status}.`, lead.company);
          
          // Trigger automation if status became "Qualified" or "Won"
          if (status === 'Qualified') {
            runWorkflowTrigger('Lead Stage Qualified', lead.name, lead.company);
          } else if (status === 'Won') {
            logActivity('Workflow', 'Deal Closed Won 🎉', `Enterprise contract secured for ${lead.company}! Total value: ₹${lead.value.toLocaleString('en-IN')}`, lead.company);
            runWorkflowTrigger('Deal Won', lead.name, lead.company);
            
            // Auto add to companies if won and doesn't exist
            setCompanies(companiesPrev => {
              if (!companiesPrev.some(c => c.name.toLowerCase() === lead.company.toLowerCase())) {
                const newCompany: Company = {
                  id: `comp_${Date.now()}`,
                  name: lead.company,
                  industry: 'Technology',
                  size: '51-200',
                  website: `https://${lead.company.toLowerCase().replace(/\s+/g, '')}.com`,
                  country: 'India',
                  revenuePotential: lead.value,
                  activeDeals: 1,
                  joinedAt: new Date().toISOString()
                };
                return [newCompany, ...companiesPrev];
              }
              return companiesPrev;
            });
          }
        }
        return { ...lead, status };
      }
      return lead;
    }));
  };

  // Delete Lead
  const deleteLead = (id: string) => {
    const leadToDelete = leads.find(l => l.id === id);
    if (leadToDelete) {
      setLeads(prev => prev.filter(lead => lead.id !== id));
      logActivity('System', 'Lead Deleted', `${leadToDelete.name} was removed from the database.`, leadToDelete.company);
    }
  };

  // Add Contact
  const addContact = (contactData: Omit<Contact, 'id' | 'addedAt'>) => {
    const newContact: Contact = {
      ...contactData,
      id: `cnt_${Date.now()}`,
      addedAt: new Date().toISOString()
    };
    setContacts(prev => [newContact, ...prev]);
    logActivity('System', 'New Contact Created', `${newContact.name} was saved as a contact for ${newContact.companyName}.`, newContact.companyName);
  };

  // Add Company
  const addCompany = (companyData: Omit<Company, 'id' | 'joinedAt'>) => {
    const newCompany: Company = {
      ...companyData,
      id: `comp_${Date.now()}`,
      joinedAt: new Date().toISOString()
    };
    setCompanies(prev => [newCompany, ...prev]);
    logActivity('System', 'Company Profile Registered', `Registered business profile for ${newCompany.name}.`, newCompany.name);
  };

  // Add Institution
  const addInstitution = (instData: Omit<Institution, 'id'>) => {
    const newInst: Institution = {
      ...instData,
      id: `inst_${Date.now()}`
    };
    setInstitutions(prev => [newInst, ...prev]);
    logActivity('System', 'Institution Added', `Registered educational institution: ${newInst.name}.`, newInst.name);
  };

  // Update Institution Status
  const updateInstitutionStatus = (id: string, status: Institution['status']) => {
    setInstitutions(prev => prev.map(inst => {
      if (inst.id === id) {
        logActivity('System', 'Institution Status Changed', `${inst.name} is now marked as ${status}.`, inst.name);
        return { ...inst, status };
      }
      return inst;
    }));
  };

  // Add Recruiter
  const addRecruiter = (recData: Omit<Recruiter, 'id' | 'lastActive'>) => {
    const newRec: Recruiter = {
      ...recData,
      id: `rec_${Date.now()}`,
      lastActive: new Date().toISOString()
    };
    setRecruiters(prev => [newRec, ...prev]);
    logActivity('System', 'Recruiter Registered', `New hiring manager registered: ${newRec.name} at ${newRec.company}.`, newRec.company);
  };

  // Update Student Plan
  const updateStudentPlan = (id: string, planType: Student['planType']) => {
    setStudents(prev => prev.map(student => {
      if (student.id === id) {
        logActivity('System', 'Student Plan Upgraded', `${student.name} was moved to ${planType} plan.`, student.name);
        
        if (planType === 'PRO' || planType === 'PREMIUM') {
          runWorkflowTrigger('Student Upgraded Pro', student.name);
        }
        return { ...student, planType };
      }
      return student;
    }));
  };

  // Add Task
  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'status'>) => {
    const newTask: Task = {
      ...taskData,
      id: `tsk_${Date.now()}`,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [newTask, ...prev]);
    logActivity('Note', 'Task Created', `Task created: "${newTask.title}" (Due: ${newTask.dueDate}).`, newTask.relatedTo);
  };

  // Toggle Task Status
  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        const nextStatus = task.status === 'Pending' ? 'Completed' : 'Pending';
        logActivity('Note', 'Task Updated', `Task "${task.title}" was marked as ${nextStatus.toLowerCase()}.`, task.relatedTo);
        return { ...task, status: nextStatus };
      }
      return task;
    }));
  };

  // Add Meeting
  const addMeeting = (meetingData: Omit<Meeting, 'id' | 'status'>) => {
    const newMtg: Meeting = {
      ...meetingData,
      id: `mtg_${Date.now()}`,
      status: 'Scheduled'
    };
    setMeetings(prev => [newMtg, ...prev]);
    logActivity('Meeting', 'Meeting Scheduled', `Meeting scheduled with ${newMtg.relatedTo}: "${newMtg.title}" at ${newMtg.date} ${newMtg.time}.`, newMtg.relatedTo);
  };

  // Complete Meeting
  const completeMeeting = (id: string) => {
    setMeetings(prev => prev.map(mtg => {
      if (mtg.id === id) {
        logActivity('Meeting', 'Meeting Completed', `Completed meeting: "${mtg.title}" with ${mtg.relatedTo}.`, mtg.relatedTo);
        return { ...mtg, status: 'Completed' };
      }
      return mtg;
    }));
  };

  // Add Invoice
  const addInvoice = (invoiceData: Omit<Invoice, 'id' | 'invoiceNumber' | 'issueDate' | 'taxAmount' | 'totalAmount'>) => {
    const taxAmount = Math.round(invoiceData.amount * 0.18); // 18% GST standard in India
    const totalAmount = invoiceData.amount + taxAmount;
    
    const newInvoice: Invoice = {
      ...invoiceData,
      id: `inv_${Date.now()}`,
      invoiceNumber: `INV-2026-0${invoices.length + 1}`,
      issueDate: new Date().toISOString().split('T')[0],
      taxAmount,
      totalAmount,
    };
    
    setInvoices(prev => [newInvoice, ...prev]);
    logActivity('System', 'Invoice Generated', `Drafted invoice ${newInvoice.invoiceNumber} for ${newInvoice.clientName} worth ₹${totalAmount.toLocaleString('en-IN')}`, newInvoice.clientName);
  };

  // Update Invoice Status (and trigger payment log if paid)
  const updateInvoiceStatus = (id: string, status: Invoice['status']) => {
    setInvoices(prev => prev.map(inv => {
      if (inv.id === id) {
        if (inv.status !== status) {
          logActivity('System', 'Invoice Status Updated', `Invoice ${inv.invoiceNumber} changed to ${status}.`, inv.clientName);
          
          if (status === 'Paid') {
            // Log a Payment transaction
            const newPayment: Payment = {
              id: `pay_${Date.now()}`,
              invoiceId: inv.id,
              amount: inv.totalAmount,
              status: 'Success',
              gateway: 'Razorpay',
              transactionId: `pay_RZP_${Math.floor(100000000 + Math.random() * 900000000)}`,
              timestamp: new Date().toISOString(),
              customerName: inv.clientName
            };
            setPayments(payPrev => [newPayment, ...payPrev]);
            logActivity('Workflow', 'Payment Captured', `Received payment of ₹${inv.totalAmount.toLocaleString('en-IN')} from ${inv.clientName} via Razorpay.`, inv.clientName);
          }
        }
        return { ...inv, status };
      }
      return inv;
    }));
  };

  // Launch Marketing Campaign
  const launchCampaign = (id: string) => {
    setCampaigns(prev => prev.map(camp => {
      if (camp.id === id) {
        logActivity('Email', 'Campaign Launched 🚀', `Marketing campaign "${camp.name}" is now active. Dispatched to users.`, camp.name);
        return { 
          ...camp, 
          status: 'Active', 
          sentCount: camp.type === 'Email' ? 12000 : 3500,
          openRate: camp.type === 'Email' ? 24.5 : 98.0,
          clickRate: camp.type === 'Email' ? 4.2 : 12.8,
          conversions: camp.type === 'Email' ? 140 : 210,
        };
      }
      return camp;
    }));
  };

  // Toggle Workflow State
  const toggleWorkflow = (id: string) => {
    setWorkflows(prev => prev.map(wf => {
      if (wf.id === id) {
        const nextActive = !wf.active;
        logActivity('System', 'Workflow Toggled', `Automation workflow "${wf.name}" has been ${nextActive ? 'enabled' : 'disabled'}.`);
        return { ...wf, active: nextActive };
      }
      return wf;
    }));
  };

  // Trigger Workflow Live (Simulation)
  const triggerWorkflowLive = (id: string) => {
    setWorkflows(prev => prev.map(wf => {
      if (wf.id === id) {
        logActivity('Workflow', 'Workflow Run Executed ⚡', `Automation workflow "${wf.name}" successfully executed action: "${wf.action}".`);
        return { 
          ...wf, 
          runCount: wf.runCount + 1,
          lastRun: new Date().toISOString()
        };
      }
      return wf;
    }));
  };

  // Internal trigger runner
  const runWorkflowTrigger = (triggerType: string, itemName: string, companyName?: string) => {
    workflows.forEach(wf => {
      if (wf.active && wf.trigger === triggerType) {
        setTimeout(() => {
          setWorkflows(prevWf => prevWf.map(w => {
            if (w.id === wf.id) {
              logActivity('Workflow', 'Workflow Automatic Trigger ⚡', `Automation "${w.name}" fired by event [${triggerType}]. Performed: "${w.action}" for ${itemName}.`, companyName || itemName);
              return {
                ...w,
                runCount: w.runCount + 1,
                lastRun: new Date().toISOString()
              };
            }
            return w;
          }));
        }, 500);
      }
    });
  };

  // Reset to default seed databases
  const resetAllData = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('crm_leads');
      localStorage.removeItem('crm_contacts');
      localStorage.removeItem('crm_companies');
      localStorage.removeItem('crm_institutions');
      localStorage.removeItem('crm_recruiters');
      localStorage.removeItem('crm_students');
      localStorage.removeItem('crm_campaigns');
      localStorage.removeItem('crm_tasks');
      localStorage.removeItem('crm_meetings');
      localStorage.removeItem('crm_activities');
      localStorage.removeItem('crm_invoices');
      localStorage.removeItem('crm_payments');
      localStorage.removeItem('crm_workflows');

      setLeads(seedLeads);
      setContacts(seedContacts);
      setCompanies(seedCompanies);
      setInstitutions(seedInstitutions);
      setRecruiters(seedRecruiters);
      setStudents(seedStudents);
      setCampaigns(seedCampaigns);
      setTasks(seedTasks);
      setMeetings(seedMeetings);
      setActivities(seedActivities);
      setInvoices(seedInvoices);
      setPayments(seedPayments);
      setWorkflows(seedWorkflows);

      logActivity('System', 'Database Reset', 'Cleared all local modifications and restored defaults.');
    }
  };

  return (
    <CRMContext.Provider
      value={{
        leads,
        contacts,
        companies,
        institutions,
        recruiters,
        students,
        campaigns,
        tasks,
        meetings,
        activities,
        invoices,
        payments,
        workflows,
        addLead,
        updateLeadStatus,
        deleteLead,
        addContact,
        addCompany,
        addInstitution,
        updateInstitutionStatus,
        addRecruiter,
        updateStudentPlan,
        addTask,
        toggleTask,
        addMeeting,
        completeMeeting,
        addInvoice,
        updateInvoiceStatus,
        launchCampaign,
        toggleWorkflow,
        triggerWorkflowLive,
        logActivity,
        resetAllData
      }}
    >
      {children}
    </CRMContext.Provider>
  );
};

export const useCRM = () => {
  const context = useContext(CRMContext);
  if (context === undefined) {
    throw new Error('useCRM must be used within a CRMProvider');
  }
  return context;
};
