import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import {
  LayoutDashboard,
  Info,
  BookOpen,
  Image,
  Calendar,
  Briefcase,
  Building,
  Users,
  DollarSign,
} from 'lucide-react';
import type { SelectChurch } from 'workers/database/schema/church';
import { ChurchAbout } from './ChurchAbout';
import { ChurchOverview } from './ChurchOverview';

interface ChurchTabsProps {
  church: SelectChurch;
  districtId: number;
}

const tabs = [
  { value: 'overview', label: 'Overview', icon: LayoutDashboard },
  { value: 'about', label: 'About', icon: Info },
  { value: 'history', label: 'History', icon: BookOpen },
  { value: 'gallery', label: 'Gallery', icon: Image },
  { value: 'schedule', label: 'Schedule', icon: Calendar },
  { value: 'departments', label: 'Departments', icon: Briefcase },
  { value: 'missions', label: 'Mission Churches', icon: Building },
  { value: 'members', label: 'Members', icon: Users },
  { value: 'offerings', label: 'Offerings', icon: DollarSign },
];

export function ChurchTabs({ church, districtId }: ChurchTabsProps) {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <div className="border-b border-border sticky top-0  z-10">
        <TabsList className="w-full h-auto p-0 bg-transparent flex overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="tab-trigger flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <div className="pt-6">
        <TabsContent value="overview" className="mt-0">
          <ChurchOverview church={church} />
        </TabsContent>
        <TabsContent value="about" className="mt-0">
          <ChurchAbout church={church} />
        </TabsContent>
        <TabsContent value="history" className="mt-0">
          <div className="card-elevated p-6">
            <h3 className="text-xl font-serif font-semibold mb-4">
              Church History
            </h3>
            <p className="text-muted-foreground">
              History information coming soon...
            </p>
          </div>
        </TabsContent>
        <TabsContent value="gallery" className="mt-0">
          <div className="card-elevated p-6">
            <h3 className="text-xl font-serif font-semibold mb-4">Gallery</h3>
            <p className="text-muted-foreground">Gallery coming soon...</p>
          </div>
        </TabsContent>
        <TabsContent value="schedule" className="mt-0">
          <div className="card-elevated p-6">
            <h3 className="text-xl font-serif font-semibold mb-4">
              Weekly Schedule
            </h3>
            <p className="text-muted-foreground">
              Schedule information coming soon...
            </p>
          </div>
        </TabsContent>
        <TabsContent value="departments" className="mt-0">
          <div className="card-elevated p-6">
            <h3 className="text-xl font-serif font-semibold mb-4">
              Departments
            </h3>
            <p className="text-muted-foreground">
              Departments information coming soon...
            </p>
          </div>
        </TabsContent>
        <TabsContent value="missions" className="mt-0">
          <div className="card-elevated p-6">
            <h3 className="text-xl font-serif font-semibold mb-4">
              Mission Churches
            </h3>
            <p className="text-muted-foreground">
              Mission churches information coming soon...
            </p>
          </div>
        </TabsContent>
        <TabsContent value="members" className="mt-0">
          <div className="card-elevated p-6">
            <h3 className="text-xl font-serif font-semibold mb-4">Members</h3>
            <p className="text-muted-foreground">
              Members information coming soon...
            </p>
          </div>
        </TabsContent>
        <TabsContent value="offerings" className="mt-0">
          <div className="card-elevated p-6">
            <h3 className="text-xl font-serif font-semibold mb-4">Offerings</h3>
            <p className="text-muted-foreground">
              Offerings information coming soon...
            </p>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
}
