import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-dashboard',
  imports : [CommonModule, FormsModule],
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {
  doctor = {
    name: 'Dr. Mohamed Abdelsalam',
    title: 'Oncology Specialist',
    syndicateNumber: 'SYN-203948',
    about: 'Specialist in Bone Cancer Diagnosis with over 10 years of experience in oncology and radiology. Passionate about AI-powered medical imaging.',
    photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=faces',
    createdAt: new Date('2023-09-12'),
    contact: {
      email: 'm.abdelsalam@medicalcenter.com',
      phone: '+20 100 123 4567'
    },
    schedule: {
      days: ['Mon', 'Wed', 'Fri'],
      hours: '9:00 AM - 4:00 PM'
    }
  };

  stats = {
    totalPatients: 124,
    newCases: 8,
    reportsPending: 6,
    completedCases: 110,
    satisfactionRate: 96
  };

  statsCards = [
    { label: 'Total Patients', value: this.stats.totalPatients, icon: 'people', trend: 'up' },
    { label: 'New Cases', value: this.stats.newCases, icon: 'person_add', trend: 'up' },
    { label: 'Pending Reports', value: this.stats.reportsPending, icon: 'pending_actions', trend: 'down' },
    { label: 'Completed Cases', value: this.stats.completedCases, icon: 'check_circle', trend: 'up' },
    { label: 'Satisfaction Rate', value: this.stats.satisfactionRate + '%', icon: 'sentiment_satisfied', trend: 'neutral' }
  ];

  recentPatients = [
    { id: 'P-10024', name: 'Ahmed Khaled', age: 42, status: 'waiting', diagnosis: 'Pending', lastVisit: new Date('2025-04-10') },
    { id: 'P-10023', name: 'Laila Mohamed', age: 35, status: 'diagnosed', diagnosis: 'Osteosarcoma', lastVisit: new Date('2025-04-14') },
    { id: 'P-10022', name: 'Sara Emad', age: 28, status: 'analysis', diagnosis: 'Analysis in Progress', lastVisit: new Date('2025-04-13') },
    { id: 'P-10021', name: 'Omar Hassan', age: 50, status: 'treated', diagnosis: 'Metastatic Bone Cancer', lastVisit: new Date('2025-04-12') },
    { id: 'P-10020', name: 'Fatima Ali', age: 60, status: 'followup', diagnosis: 'Chondrosarcoma', lastVisit: new Date('2025-04-10') }
  ];

  

  notifications = [
    { id: 1, title: 'New lab results available', time: '2 hours ago', read: false, priority: 'high' },
    { id: 2, title: 'Patient message received', time: '5 hours ago', read: true, priority: 'medium' },
    { id: 3, title: 'System maintenance scheduled', time: '1 day ago', read: true, priority: 'low' }
  ];

  tasks = [
    { title: "Review Ahmed Khaled's MRI results", due: "Due today, 3:00 PM", completed: false },
    { title: "Prepare presentation for oncology conference", due: "Due Apr 20", completed: false },
    { title: "Update patient treatment plans", due: "Due Apr 22", completed: false }
  ];

  quickActions = [
    { icon: 'add_Patient', label: 'New Patient', action: 'addPatient' },
    { icon: 'assignment', label: 'Create Report', action: 'createReport' },
    { icon: 'chat', label: 'Messages', action: 'viewMessages' },
    { icon: 'settings', label: 'Settings', action: 'openSettings' }
  ];

  today = new Date();
  unreadNotificationsCount = 0;

  ngOnInit() {
    this.calculateUnreadNotifications();
  }

  calculateUnreadNotifications() {
    this.unreadNotificationsCount = this.notifications.filter(n => !n.read).length;
  }

  markAllAsRead() {
    this.notifications.forEach(n => n.read = true);
    this.calculateUnreadNotifications();
  }

  getStatusColor(status: string): string {
    const statusColors: { [key: string]: string } = {
      waiting: 'bg-amber-100 text-amber-800',
      diagnosed: 'bg-blue-100 text-blue-800',
      analysis: 'bg-purple-100 text-purple-800',
      treated: 'bg-green-100 text-green-800',
      followup: 'bg-cyan-100 text-cyan-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  }

  getAppointmentStatusColor(status: string): string {
    return status === 'confirmed' ? 'bg-purple-100' : 'bg-amber-100';
  }

  getNotificationPriorityColor(priority: string): string {
    const priorityColors: { [key: string]: string } = {
      high: 'text-red-500',
      medium: 'text-amber-500',
      low: 'text-gray-500'
    };
    return priorityColors[priority] || 'text-gray-500';
  }

  executeAction(action: string) {
    console.log(`Action triggered: ${action}`);
    // Implement action logic here
  }
}