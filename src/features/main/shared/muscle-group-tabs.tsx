import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import TabsSkeleton from '@/features/main/skeleton/tabs-skeleton';
import { useMuscleGroups } from '@/features/main/hooks/use-muscle-groups';

interface MuscleGroupTabsProps {
  value?: string;
  onChange: (id: string) => void;
}

export default function MuscleGroupTabs({ value, onChange }: MuscleGroupTabsProps) {
  const groupsQuery = useMuscleGroups();
  const groups = groupsQuery.data ?? [];

  if (groupsQuery.isPending) return <TabsSkeleton />;
  if (!groups.length) return null;

  return (
    <div className="overflow-x-auto scrollbar-none">
      <Tabs value={value ?? groups[0]?._id} onValueChange={onChange} className="mx-auto w-max">
        <TabsList variant="pill">
          {groups.map((group) => (
            <TabsTrigger key={group._id} value={group._id}>
              {group.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
