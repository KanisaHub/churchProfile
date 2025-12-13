import {
  Users,
  DollarSign,
  Calendar,
  Building,
  TrendingUp,
  MapPin,
  Church,
} from 'lucide-react';
import type { SelectChurch } from 'workers/database/schema/church';
import { StatCard } from '../ui/stat-card';

interface ChurchOverviewProps {
  church: SelectChurch;
}

export function ChurchOverview({ church }: ChurchOverviewProps) {
  const foundedYear = new Date(church.establishedDate).getFullYear();

  const stats = [
    {
      label: 'Total Members',
      value: '8',
      icon: Users,
      change: '-',
      color: 'text-gold',
      bgColor: 'bg-gold-light',
    },
    {
      label: 'Active Members',
      value: '13',
      icon: Users,
      change: '-',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      label: 'Mission Churches',
      value: '9',
      icon: Building,
      change: '-',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Departments',
      value: '5',
      icon: Calendar,
      change: '-',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Church Header */}
      <div className="card-elevated p-6 border rounded-lg bg-white">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-gold flex items-center justify-center shrink-0">
            <Building className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-serif font-bold text-foreground">
              {church.name}
            </h2>
            <p className="text-muted-foreground">{church.pastor}</p>
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <MapPin size={14} />
              <span>
                {church.location}, {church.city}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Established</p>
            <p className="text-2xl font-serif font-bold text-gold">
              {foundedYear}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <StatCard
              title={stat.label}
              value={stat.value}
              icon={stat.icon}
              variant={stat.bgColor === 'bg-gold-light' ? 'gold' : 'default'}
            />
          </div>
        ))}
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-elevated p-6">
          <h3 className="text-lg font-serif font-semibold mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-gold" />
            Financial Summary
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-border">
              <span className="text-muted-foreground">
                Total Offerings (YTD)
              </span>
              <span className="text-xl font-semibold text-muted-foreground">
                Coming soon
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-border">
              <span className="text-muted-foreground">Average Weekly</span>
              <span className="text-xl font-semibold text-muted-foreground">
                Coming soon
              </span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-muted-foreground">Last Week</span>
              <span className="text-xl font-semibold text-muted-foreground">
                Coming soon
              </span>
            </div>
          </div>
        </div>

        <div className="card-elevated p-6">
          <h3 className="text-lg font-serif font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-gold" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {[
              {
                text: 'New member registration',
                time: '2 hours ago',
                type: 'member',
              },
              {
                text: 'Weekly offering recorded',
                time: '1 day ago',
                type: 'offering',
              },
              {
                text: 'Youth event scheduled',
                time: '2 days ago',
                type: 'event',
              },
              {
                text: 'Mission church report submitted',
                time: '3 days ago',
                type: 'report',
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 py-2">
                <div className="w-2 h-2 rounded-full bg-gold" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {activity.text}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card-elevated p-6">
        <h3 className="text-lg font-serif font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            'Add Member',
            'Record Offering',
            'Schedule Event',
            'View Reports',
          ].map((action) => (
            <button
              key={action}
              className="px-4 py-3 bg-muted hover:bg-gold-light text-foreground rounded-lg font-medium transition-colors duration-200 text-sm"
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
