import { Header } from '@/components/layouts';
import { Card, CardContent, Badge, Button } from '@/components/ui';

// Mock data for demonstration
const alerts = [
  {
    id: '1',
    type: 'weather',
    severity: 'warning',
    title: 'Heavy Rain Expected',
    message: 'Rain forecast for next 48 hours in your area. Delay spraying operations.',
    crop: 'Tomato',
  },
];

const quickActions = [
  {
    id: 'crop-doctor',
    title: 'Crop Doctor',
    description: 'Diagnose plant diseases',
    icon: '🔬',
    href: '/crop-doctor',
    color: 'bg-success/10',
  },
  {
    id: 'shop',
    title: 'Shop Seeds',
    description: 'Browse catalog',
    icon: '🌱',
    href: '/shop',
    color: 'bg-primary/10',
  },
  {
    id: 'calendar',
    title: 'My Calendar',
    description: 'View schedule',
    icon: '📅',
    href: '/calendar',
    color: 'bg-secondary/10',
  },
  {
    id: 'voice',
    title: 'Voice Query',
    description: 'Ask anything',
    icon: '🎤',
    href: '#voice',
    color: 'bg-muted/10',
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Header title="Kisan Mitra" showCart />

      <div className="px-4 py-4 max-w-lg mx-auto space-y-6">
        {/* Welcome Section */}
        <section>
          <h1 className="font-heading text-xl text-earth-brown mb-1">
            Good Morning, Ramesh
          </h1>
          <p className="text-sm text-charcoal/70">
            Nashik, Maharashtra
          </p>
        </section>

        {/* Weather Card */}
        <Card className="bg-success/5 border-success/20">
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-xs text-earth-brown/70 uppercase tracking-wide font-medium mb-1">
                Today&apos;s Weather
              </p>
              <p className="font-mono text-2xl font-semibold text-earth-brown">
                28°C
              </p>
              <p className="text-sm text-charcoal/70">Partly Cloudy</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-earth-brown/70">Humidity</p>
              <p className="font-mono text-lg font-medium text-earth-brown">65%</p>
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        {alerts.length > 0 && (
          <section>
            <h2 className="font-heading text-base text-earth-brown mb-3">
              Active Alerts
            </h2>
            <Card variant="accent" accentColor="secondary">
              <CardContent>
                <div className="flex items-start gap-3">
                  <Badge color="secondary">Warning</Badge>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-earth-brown mb-1">
                      {alerts[0].title}
                    </h3>
                    <p className="text-xs text-charcoal/70">
                      {alerts[0].message}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Quick Actions */}
        <section>
          <h2 className="font-heading text-base text-earth-brown mb-3">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <Card key={action.id} padding="sm" className="hover:border-earth-brown/30 transition-colors">
                <a href={action.href} className="block">
                  <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center mb-2 text-lg`}>
                    {action.icon}
                  </div>
                  <h3 className="font-semibold text-sm text-earth-brown">
                    {action.title}
                  </h3>
                  <p className="text-xs text-charcoal/60">
                    {action.description}
                  </p>
                </a>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading text-base text-earth-brown">
              Featured Seeds
            </h2>
            <a href="/shop" className="text-xs text-primary font-medium">
              View All
            </a>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4">
            {['Tomato Hybrid 512', 'Chilli Fire King', 'Okra Premium'].map(
              (name, i) => (
                <Card key={i} padding="sm" className="flex-shrink-0 w-36">
                  <div className="aspect-square bg-parchment rounded-md mb-2 flex items-center justify-center">
                    <span className="text-3xl">
                      {i === 0 ? '🍅' : i === 1 ? '🌶️' : '🥒'}
                    </span>
                  </div>
                  <h3 className="font-medium text-xs text-earth-brown truncate">
                    {name}
                  </h3>
                  <p className="font-mono text-sm font-semibold text-primary">
                    Rs {(i + 1) * 150 + 200}
                  </p>
                </Card>
              )
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="pt-2">
          <Button className="w-full">
            Start Crop Diagnosis
          </Button>
        </section>
      </div>
    </main>
  );
}
