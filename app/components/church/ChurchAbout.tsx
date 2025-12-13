import { MapPin, Phone, Mail, Calendar, Users, Building } from 'lucide-react';
import type { SelectChurch } from 'workers/database/schema/church';

interface ChurchAboutProps {
  church: SelectChurch;
}

export function ChurchAbout({ church }: ChurchAboutProps) {
  const foundedYear = new Date(church.establishedDate).getFullYear();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* About Section */}
      <div className="card-elevated p-6 border rounded-lg bg-white">
        <h3 className="text-xl font-serif font-semibold mb-4">
          About Our Church
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {church.name} is a vibrant community of faith located in {church.city}
          . Under the leadership of {church.pastor}, we strive to serve our
          community and grow together in faith.
        </p>
      </div>

      {/* Contact Information */}
      <div className="card-elevated p-6 border rounded-lg bg-white">
        <h3 className="text-xl font-serif font-semibold mb-4">
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
            <MapPin className="w-5 h-5 text-gold mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Address</p>
              <p className="text-sm text-muted-foreground">{church.location}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
            <Building className="w-5 h-5 text-gold mt-0.5" />
            <div>
              <p className="font-medium text-foreground">City</p>
              <p className="text-sm text-muted-foreground">{church.city}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
            <Calendar className="w-5 h-5 text-gold mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Established</p>
              <p className="text-sm text-muted-foreground">
                {new Date(church.establishedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership */}
      <div className="card-elevated p-6 border rounded-lg bg-white ">
        <h3 className="text-xl font-serif font-semibold mb-4">Leadership</h3>
        <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
          <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-foreground text-lg">
              {church.pastor}
            </p>
            <p className="text-muted-foreground">Senior Pastor</p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="card-elevated p-6 border rounded-lg bg-white">
        <h3 className="text-xl font-serif font-semibold mb-4">
          Church Statistics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-3xl font-bold text-gold">
              {new Date().getFullYear() - foundedYear}
            </p>
            <p className="text-sm text-muted-foreground">Years of Service</p>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-3xl font-bold text-gold">-</p>
            <p className="text-sm text-muted-foreground">Members</p>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-3xl font-bold text-gold">-</p>
            <p className="text-sm text-muted-foreground">Mission Churches</p>
          </div>
        </div>
      </div>
    </div>
  );
}
