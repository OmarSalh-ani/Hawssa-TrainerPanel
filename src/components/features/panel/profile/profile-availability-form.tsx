import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useUpdateAvailability } from '@/hooks/profile';
import { ProfileAvailability } from '@/lib/types/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const days = [
  { num: 1, key: 'Saturday', label: 'Saturday' },
  { num: 2, key: 'Sunday', label: 'Sunday' },
  { num: 3, key: 'Monday', label: 'Monday' },
  { num: 4, key: 'Tuesday', label: 'Tuesday' },
  { num: 5, key: 'Wednesday', label: 'Wednesday' },
  { num: 6, key: 'Thursday', label: 'Thursday' },
  { num: 7, key: 'Friday', label: 'Friday' },
];

const availZodFields = days.reduce((acc, day) => {
  acc[`${day.key}IsActive`] = z.boolean();
  acc[`${day.key}StartTime`] = z.string().min(2);
  acc[`${day.key}EndTime`] = z.string().min(2);
  return acc;
}, {} as Record<string, z.ZodTypeAny>);
const AvailabilitySchema = z.object(availZodFields);
type AvailabilityFormType = z.infer<typeof AvailabilitySchema>;

interface ProfileAvailabilityFormProps {
  availabilities: ProfileAvailability[];
  onUpdated: () => void;
}

export default function ProfileAvailabilityForm({
  availabilities,
  onUpdated,
}: ProfileAvailabilityFormProps) {
  // Map API availabilities to form defaults
  const getDefault = () => {
    const map: Partial<AvailabilityFormType> = {};
    days.forEach(day => {
      const d = availabilities.find(a => a.dayNumber === day.num);
      map[`${day.key}IsActive`] = d ? !!d.isActive : false;
      map[`${day.key}StartTime`] = d ? d.startTime : '';
      map[`${day.key}EndTime`] = d ? d.endTime : '';
    });
    return map as AvailabilityFormType;
  };
  const form = useForm<AvailabilityFormType>({
    resolver: zodResolver(AvailabilitySchema),
    defaultValues: getDefault(),
  });
  const updateAvailability = useUpdateAvailability('en');

  function onSubmit(values: AvailabilityFormType) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload: any = {};
    days.forEach(day => {
      payload[`${day.key}IsActive`] = values[`${day.key}IsActive`];
      payload[`${day.key}StartTime`] = values[`${day.key}StartTime`];
      payload[`${day.key}EndTime`] = values[`${day.key}EndTime`];
    });
    updateAvailability.mutate(payload, {
      onSuccess: onUpdated,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {days.map(day => (
            <FormItem key={day.num} className='p-3 border rounded-md bg-gray-50'>
              <div className='flex items-center mb-2 gap-2'>
                <FormField
                  control={form.control}
                  name={`${day.key}IsActive` as keyof AvailabilityFormType}
                  render={({ field }) => (
                    <FormControl>
                      <Checkbox checked={field.value as boolean} onCheckedChange={field.onChange} />
                    </FormControl>
                  )}
                />
                <FormLabel className='mb-0'>{day.label}</FormLabel>
              </div>
              <div className='flex gap-2'>
                <FormField
                  control={form.control}
                  name={`${day.key}StartTime` as keyof AvailabilityFormType}
                  render={({ field }) => (
                    <FormControl>
                      <Input {...field} type='time' disabled={!form.watch(`${day.key}IsActive`) as boolean} value={field.value as string} />
                    </FormControl>
                  )}
                />
                <span className='mt-2 font-bold'>-</span>
                <FormField
                  control={form.control}
                  name={`${day.key}EndTime` as keyof AvailabilityFormType}
                  render={({ field }) => (
                    <FormControl>
                      <Input {...field} type='time' disabled={!form.watch(`${day.key}IsActive`) as boolean} value={field.value as string} />
                    </FormControl>
                  )}
                />
              </div>
              <FormMessage />
            </FormItem>
          ))}
        </div>
        <Button type='submit' disabled={updateAvailability.status === 'pending'}>
          {updateAvailability.status === 'pending' ? 'Saving...' : 'Save'}
        </Button>
      </form>
    </Form>
  );
}
