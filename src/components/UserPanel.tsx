import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit2,
  LogOut,
  MessageSquare,
  Ticket,
  TrendingDown,
  Brain,
  Settings as SettingsIcon,
  Plus,
  Search,
  Filter,
  Eye,
  Download,
  Bell,
  Lock,
  Globe,
  AlertCircle,
  Check,
  Clock,
  BarChart3,
  Users as UsersIcon,
  Loader,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface UserPanelProps {
  email: string;
  onLogout: () => void;
}

type PanelTab = "overview" | "campaigns" | "tickets" | "analytics" | "profile" | "settings";

interface Campaign {
  id: string;
  name: string;
  status: "active" | "paused" | "completed";
  startDate: string;
  messagesSent: number;
  engagement: number;
  revenue: number;
}

interface Ticket {
  id: string;
  title: string;
  status: "open" | "pending" | "closed";
  priority: "low" | "medium" | "high";
  createdDate: string;
  response: string;
}

interface UserStats {
  totalCampaigns: number;
  totalMessages: number;
  totalRevenue: number;
  engagementRate: number | string;
  openTickets: number;
  avgResponseTime: string;
}

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  company: string;
  location: string;
  timezone: string;
  website: string;
}

export default function UserPanel({ email, onLogout }: UserPanelProps) {
  const [activeTab, setActiveTab] = useState<PanelTab>("overview");
  const [editProfile, setEditProfile] = useState(false);
  const [showNewCampaignModal, setShowNewCampaignModal] = useState(false);
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "John Doe",
    email: email,
    phone: "+1 (555) 123-4567",
    company: "TechStart Inc",
    location: "San Francisco, CA",
    timezone: "PST",
    website: "www.techstart.com",
  });

  // Fetch all data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [profileRes, campaignsRes, ticketsRes, analyticsRes] = await Promise.all([
          fetch(`/api/user/profile/${email}`),
          fetch(`/api/user/campaigns/${email}`),
          fetch(`/api/user/tickets/${email}`),
          fetch(`/api/user/analytics/${email}`),
        ]);

        if (profileRes.ok) {
          const profile = await profileRes.json();
          setProfileData(profile);
        }

        if (campaignsRes.ok) {
          const campaignsData = await campaignsRes.json();
          setCampaigns(campaignsData);
        }

        if (ticketsRes.ok) {
          const ticketsData = await ticketsRes.json();
          setTickets(ticketsData);
        }

        if (analyticsRes.ok) {
          const analyticsData = await analyticsRes.json();
          setStats(analyticsData);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [email]);

  const handleSaveProfile = async () => {
    try {
      const res = await fetch(`/api/user/profile/${email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      });

      if (res.ok) {
        setEditProfile(false);
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "open":
        return "bg-green-100 text-green-800";
      case "completed":
      case "closed":
        return "bg-gray-100 text-gray-800";
      case "paused":
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 pb-12 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader className="w-12 h-12 text-green-600 animate-spin" />
          <p className="text-gray-600 font-semibold">Loading your panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">User Panel</h1>
          <p className="text-gray-600">Manage your campaigns, tickets, and account settings</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
          <div className="flex flex-wrap md:flex-nowrap border-b border-gray-200">
            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "campaigns", label: "Campaigns", icon: MessageSquare },
              { id: "tickets", label: "Support Tickets", icon: Ticket },
              { id: "analytics", label: "Analytics", icon: TrendingDown },
              { id: "profile", label: "Profile", icon: User },
              { id: "settings", label: "Settings", icon: SettingsIcon },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as PanelTab)}
                  className={`flex-1 md:flex-none px-6 py-4 font-semibold flex items-center justify-center gap-2 transition-all border-b-2 ${
                    activeTab === tab.id
                      ? "border-green-600 text-green-600 bg-green-50"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Stats Grid */}
              {stats && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm font-medium">Total Campaigns</p>
                        <p className="text-4xl font-bold text-gray-900 mt-2">{stats.totalCampaigns}</p>
                      </div>
                      <MessageSquare className="w-12 h-12 text-green-100" />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
                        <p className="text-4xl font-bold text-gray-900 mt-2">${stats.totalRevenue.toLocaleString()}</p>
                      </div>
                      <TrendingDown className="w-12 h-12 text-blue-100" />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm font-medium">Avg Engagement</p>
                        <p className="text-4xl font-bold text-gray-900 mt-2">{stats.engagementRate}%</p>
                      </div>
                      <UsersIcon className="w-12 h-12 text-purple-100" />
                    </div>
                  </div>
                </div>
              )}

              {/* Recent Campaigns */}
              <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Recent Campaigns</h2>
                  <button
                    onClick={() => setShowNewCampaignModal(true)}
                    className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    <Plus className="w-5 h-5" />
                    New Campaign
                  </button>
                </div>

                <div className="space-y-4">
                  {campaigns.slice(0, 3).map((campaign) => (
                    <div key={campaign.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div>
                        <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
                        <p className="text-sm text-gray-600">Started on {campaign.startDate}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(campaign.status)}`}>
                          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                        </span>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">${campaign.revenue.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">{campaign.engagement}% engagement</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Campaigns Tab */}
          {activeTab === "campaigns" && (
            <motion.div
              key="campaigns"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search campaigns..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  />
                </div>
                <button
                  onClick={() => setShowNewCampaignModal(true)}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  New Campaign
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {campaigns.map((campaign) => (
                  <motion.div
                    key={campaign.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{campaign.name}</h3>
                        <p className="text-sm text-gray-600">Started: {campaign.startDate}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(campaign.status)}`}>
                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold text-gray-900">{campaign.messagesSent.toLocaleString()}</span> messages sent
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold text-gray-900">{campaign.engagement}%</span> engagement rate
                      </p>
                      <p className="text-sm text-gray-600">
                        Revenue: <span className="font-semibold text-gray-900">${campaign.revenue.toLocaleString()}</span>
                      </p>
                    </div>

                    <button className="w-full mt-4 px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors font-semibold">
                      View Details
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Support Tickets Tab */}
          {activeTab === "tickets" && (
            <motion.div
              key="tickets"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search tickets..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  />
                </div>
                <button
                  onClick={() => setShowNewTicketModal(true)}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  New Ticket
                </button>
              </div>

              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <motion.div
                    key={ticket.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{ticket.title}</h3>
                          <span className="text-sm text-gray-500">#{ticket.id}</span>
                        </div>
                        <p className="text-sm text-gray-600">{ticket.response}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(ticket.status)}`}>
                          {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">Created: {ticket.createdDate}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && stats && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Messages Sent</h3>
                  <p className="text-5xl font-bold text-green-600 mb-2">{stats.totalMessages.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Across all campaigns</p>
                </div>

                <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Engagement Rate</h3>
                  <p className="text-5xl font-bold text-blue-600 mb-2">{stats.engagementRate}%</p>
                  <p className="text-sm text-gray-600">Average across campaigns</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Campaign Performance</h3>
                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-900">{campaign.name}</span>
                        <span className="text-sm font-bold text-gray-900">{campaign.engagement}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all"
                          style={{ width: `${campaign.engagement}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
                <button className="w-full inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                  <Download className="w-5 h-5" />
                  Download Full Report
                </button>
              </div>
            </motion.div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                  {!editProfile && (
                    <button
                      onClick={() => setEditProfile(true)}
                      className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit Profile
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Full Name</label>
                    <div className="mt-2 p-4 bg-gray-50 rounded-lg flex items-center gap-3">
                      <User className="w-5 h-5 text-gray-400" />
                      {editProfile ? (
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          className="flex-1 bg-white border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                        />
                      ) : (
                        <span className="text-gray-900 font-medium">{profileData.name}</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600">Email</label>
                    <div className="mt-2 p-4 bg-gray-50 rounded-lg flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900 font-medium">{profileData.email}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600">Phone</label>
                    <div className="mt-2 p-4 bg-gray-50 rounded-lg flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      {editProfile ? (
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          className="flex-1 bg-white border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                        />
                      ) : (
                        <span className="text-gray-900 font-medium">{profileData.phone}</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600">Company</label>
                    <div className="mt-2 p-4 bg-gray-50 rounded-lg flex items-center gap-3">
                      {editProfile ? (
                        <input
                          type="text"
                          value={profileData.company}
                          onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                          className="flex-1 bg-white border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                        />
                      ) : (
                        <span className="text-gray-900 font-medium">{profileData.company}</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600">Location</label>
                    <div className="mt-2 p-4 bg-gray-50 rounded-lg flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      {editProfile ? (
                        <input
                          type="text"
                          value={profileData.location}
                          onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                          className="flex-1 bg-white border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                        />
                      ) : (
                        <span className="text-gray-900 font-medium">{profileData.location}</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600">Website</label>
                    <div className="mt-2 p-4 bg-gray-50 rounded-lg flex items-center gap-3">
                      <Globe className="w-5 h-5 text-gray-400" />
                      {editProfile ? (
                        <input
                          type="text"
                          value={profileData.website}
                          onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                          className="flex-1 bg-white border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                        />
                      ) : (
                        <span className="text-gray-900 font-medium">{profileData.website}</span>
                      )}
                    </div>
                  </div>
                </div>

                {editProfile && (
                  <div className="flex gap-4 mt-8">
                    <button
                      onClick={() => setEditProfile(false)}
                      className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      <Check className="w-5 h-5" />
                      Save Changes
                    </button>
                    <button
                      onClick={() => setEditProfile(false)}
                      className="flex-1 bg-gray-200 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Notification Settings */}
              <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Bell className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Email Notifications</h3>
                      <p className="text-sm text-gray-600">Receive updates about campaigns and tickets</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setNotifications(!notifications)}
                    className={`w-14 h-8 rounded-full transition-colors flex items-center ${
                      notifications ? "bg-green-600" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full bg-white transition-transform ${
                        notifications ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <Lock className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-semibold">
                    Enable
                  </button>
                </div>
              </div>

              {/* API Settings */}
              <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">API Keys</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-900">Production Key</p>
                        <p className="text-sm text-gray-600">sk_live_••••••••••••••••</p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                        Regenerate
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-red-50 rounded-xl p-8 border border-red-200 shadow-sm">
                <h3 className="text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Danger Zone
                </h3>
                <button className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold">
                  Delete Account
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Logout Button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-all font-semibold shadow-md hover:shadow-lg"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
