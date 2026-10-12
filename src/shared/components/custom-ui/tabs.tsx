import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import type { VariantProps } from 'class-variance-authority';
import type { tabsListVariants } from '@/shared/components/ui/tabs';

interface FilterOption {
  _id: string;
  name: string;
}

interface FilterTabsProps {
  options: FilterOption[];
  value?: string;
  onChange: (value: string) => void;
  variant?: VariantProps<typeof tabsListVariants>['variant'];
  allLabel?: string;
}

export default function FilterTabs({
  options,
  value,
  onChange,
  variant = 'pill',
  allLabel,
}: FilterTabsProps) {
  if (!options.length) return null;

  return (
    <div className="overflow-x-auto scrollbar-none">
      <Tabs
        value={value ?? (allLabel ? 'all' : options[0]._id)}
        onValueChange={onChange}
        className="mx-auto w-max"
      >
        <TabsList variant={variant}>
          {allLabel && <TabsTrigger value="all">{allLabel}</TabsTrigger>}
          {options.map(({ _id, name }) => (
            <TabsTrigger key={_id} value={_id}>
              {name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
