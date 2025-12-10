'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/layouts';
import { Card, Badge, Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';
import { sampleEvents, eventTypeConfig, getUpcomingEvents } from '@/lib/data/calendar';
import { formatDate, cn } from '@/lib/utils';
import type { CalendarEvent } from '@/types';

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  // Generate calendar days (current month view)
  const calendarDays = useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startPadding = firstDay.getDay();

    const days: { date: string; day: number; isCurrentMonth: boolean; hasEvents: boolean }[] = [];

    // Previous month padding
    const prevMonth = new Date(year, month, 0);
    for (let i = startPadding - 1; i >= 0; i--) {
      const day = prevMonth.getDate() - i;
      const date = new Date(year, month - 1, day).toISOString().split('T')[0];
      days.push({
        date,
        day,
        isCurrentMonth: false,
        hasEvents: sampleEvents.some((e) => e.date === date),
      });
    }

    // Current month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day).toISOString().split('T')[0];
      days.push({
        date,
        day,
        isCurrentMonth: true,
        hasEvents: sampleEvents.some((e) => e.date === date),
      });
    }

    // Next month padding
    const remaining = 42 - days.length;
    for (let day = 1; day <= remaining; day++) {
      const date = new Date(year, month + 1, day).toISOString().split('T')[0];
      days.push({
        date,
        day,
        isCurrentMonth: false,
        hasEvents: sampleEvents.some((e) => e.date === date),
      });
    }

    return days;
  }, []);

  const selectedDateEvents = useMemo(() => {
    return sampleEvents.filter((e) => e.date === selectedDate);
  }, [selectedDate]);

  const upcomingEvents = useMemo(() => getUpcomingEvents(14), []);
  const completedEvents = useMemo(
    () => sampleEvents.filter((e) => e.completed).slice(0, 10),
    []
  );

  const today = new Date().toISOString().split('T')[0];
  const monthName = new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });

  return (
    <main className="min-h-screen bg-cream pb-20">
      <Header title="Growing Calendar" showBack />

      <div className="px-4 py-4 max-w-lg mx-auto space-y-4">
        {/* Month Header */}
        <div className="flex items-center justify-between">
          <h1 className="font-heading text-lg text-earth-brown">{monthName}</h1>
          <Badge color="success">
            {upcomingEvents.length} upcoming
          </Badge>
        </div>

        {/* Calendar Grid */}
        <Card padding="sm">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
              <div
                key={i}
                className="text-center text-[10px] font-medium text-charcoal/50 py-1"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Date grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, i) => (
              <button
                key={i}
                onClick={() => setSelectedDate(day.date)}
                className={cn(
                  'relative aspect-square flex items-center justify-center rounded-lg text-xs transition-colors',
                  day.isCurrentMonth ? 'text-charcoal' : 'text-charcoal/30',
                  day.date === today && 'font-bold',
                  day.date === selectedDate
                    ? 'bg-earth-brown text-white'
                    : 'hover:bg-parchment'
                )}
              >
                {day.day}
                {day.hasEvents && day.date !== selectedDate && (
                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>
        </Card>

        {/* Selected Date Events */}
        <section>
          <h2 className="font-heading text-sm text-earth-brown mb-2">
            {selectedDate === today
              ? "Today's Tasks"
              : formatDate(selectedDate)}
          </h2>
          {selectedDateEvents.length > 0 ? (
            <div className="space-y-2">
              {selectedDateEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <Card className="py-6 text-center">
              <p className="text-sm text-charcoal/50">No tasks scheduled</p>
            </Card>
          )}
        </section>

        {/* Tabs for Upcoming/Completed */}
        <Tabs defaultValue="upcoming">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            <div className="space-y-2">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} showDate />
              ))}
              {upcomingEvents.length === 0 && (
                <Card className="py-6 text-center">
                  <p className="text-sm text-charcoal/50">No upcoming tasks</p>
                </Card>
              )}
            </div>
          </TabsContent>
          <TabsContent value="completed">
            <div className="space-y-2">
              {completedEvents.map((event) => (
                <EventCard key={event.id} event={event} showDate />
              ))}
              {completedEvents.length === 0 && (
                <Card className="py-6 text-center">
                  <p className="text-sm text-charcoal/50">No completed tasks</p>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

function EventCard({
  event,
  showDate = false,
}: {
  event: CalendarEvent;
  showDate?: boolean;
}) {
  const config = eventTypeConfig[event.type];
  const cropEmoji: Record<string, string> = {
    tomato: '🍅',
    chilli: '🌶️',
    okra: '🥒',
    brinjal: '🍆',
    cucumber: '🥒',
    'bottle-gourd': '🫛',
    cotton: '☁️',
    maize: '🌽',
  };

  return (
    <Card
      padding="sm"
      className={cn(
        'flex items-start gap-3',
        event.completed && 'opacity-60'
      )}
    >
      <div
        className={cn(
          'w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0',
          config.color,
          'bg-opacity-15'
        )}
      >
        {config.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3
            className={cn(
              'font-medium text-sm text-earth-brown leading-tight',
              event.completed && 'line-through'
            )}
          >
            {event.title}
          </h3>
          <span className="text-lg flex-shrink-0">{cropEmoji[event.crop]}</span>
        </div>
        {showDate && (
          <p className="text-[10px] text-charcoal/50 mt-0.5">
            {formatDate(event.date)}
          </p>
        )}
        {event.notes && (
          <p className="text-xs text-charcoal/60 mt-1 line-clamp-2">
            {event.notes}
          </p>
        )}
      </div>
    </Card>
  );
}
