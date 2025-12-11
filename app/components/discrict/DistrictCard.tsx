import { Link } from 'react-router';
import { MapPin, Church, Users, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import type { SelectDistrict } from 'workers/database/schema/district';

interface DistrictCardProps {
  district: SelectDistrict;
  index: number;
}

export function DistrictCard({ district, index }: DistrictCardProps) {
  // Format date for display
  const createdDate = new Date(district.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link to={`/district/${district.id}`}>
      <Card
        className="group relative overflow-hidden border-0 shadow-card hover:shadow-card-hover transition-all duration-300 animate-slide-up cursor-pointer"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <MapPin className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {district.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {district.location}
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Superintendent
              </span>
              <Badge variant="secondary" className="font-normal">
                {district.superintendent}
              </Badge>
            </div>

            {/* Placeholder for future church count and members */}
            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border opacity-50">
              <div className="flex items-center gap-2">
                <Church className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-xl font-bold text-foreground">0</p>
                  <p className="text-xs text-muted-foreground">Churches</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-accent" />
                <div>
                  <p className="text-xl font-bold text-foreground">0</p>
                  <p className="text-xs text-muted-foreground">Members</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </Card>
    </Link>
  );
}
