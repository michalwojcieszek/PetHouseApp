type PetViewProps = {
  type: string;
  icon: string;
};

export const pets: PetViewProps[] = [
  { type: "dog", icon: "/images/icons/dog.png" },
  { type: "snake", icon: "/images/icons/snake.png" },
  { type: "cat", icon: "/images/icons/cat.png" },
  { type: "parrot", icon: "/images/icons/parrot.png" },
  { type: "hamster", icon: "/images/icons/hamster.png" },
];
