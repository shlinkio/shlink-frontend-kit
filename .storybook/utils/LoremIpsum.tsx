const LoremIpsumParagraph = () => (
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus urna et luctus sagittis. Vivamus nibh
    justo, fringilla ut luctus et, facilisis nec magna. In facilisis lacus sit amet sem mattis consequat. Aenean
    elementum erat et diam blandit, in efficitur mi pellentesque. Aenean purus quam, venenatis eget orci sit
    amet, lacinia blandit magna. Curabitur ut eros quis ipsum faucibus bibendum. Sed nibh sem, malesuada nec massa
    vel, posuere hendrerit justo. Fusce non egestas mauris. Nulla id sapien dapibus, faucibus nunc sed, condimentum leo.
  </p>
);

export type LoremIpsumProps = {
  repeat?: number;
};

export const LoremIpsum = ({ repeat = 1 }: LoremIpsumProps) => Array.from({ length: repeat }).map(
  (_, index) => <LoremIpsumParagraph key={index} />,
);
