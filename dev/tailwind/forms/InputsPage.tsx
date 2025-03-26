import type { FC } from 'react';
import { Input, Label, LabelledInput, LabelledSelect, Select, SimpleCard } from '../../../src/tailwind';

export const InputsPage: FC = () => {
  return (
    <div className="tw:flex tw:flex-col tw:gap-y-4">
      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2>Labels</h2>
        <Label>This label is not required</Label>
        <Label required>This label is required</Label>
      </div>
      <div className="tw:flex tw:flex-col tw:gap-y-3">
        <h2>Inputs</h2>
        <Input placeholder="Regular input" />
        <Input placeholder="Error input" feedback="error" />
        <Input placeholder="Disabled input" disabled />
        <Input placeholder="Readonly input" readOnly />
        <LabelledInput label="Labelled input" />
        <Input placeholder="Large input" size="lg" />
        <Input placeholder="Small input" size="sm" />
      </div>
      <div className="tw:flex tw:flex-col tw:gap-y-3">
        <h2>Selects</h2>
        <Select>
          <option>Hello</option>
          <option>Goodbye</option>
        </Select>
        <Select disabled>
          <option>Disabled select</option>
        </Select>
        <Select feedback="error">
          <option>Error feedback</option>
        </Select>
        <LabelledSelect label="Required labelled select" required>
          <option>Hello</option>
          <option>Goodbye</option>
        </LabelledSelect>
      </div>
      <div className="tw:flex tw:flex-col tw:gap-y-3">
        <h2>Inputs inside Cards</h2>
        <SimpleCard bodyClassName="tw:flex tw:flex-col tw:gap-y-3">
          <Input placeholder="Regular input" />
          <Select>
            <option>Hello</option>
            <option>Goodbye</option>
          </Select>
        </SimpleCard>
      </div>
    </div>
  );
};
