import { Button, ActionIcon } from '@mantine/core';

export function CategoryButton({
  label,
  selected,
  onToggle,
}: {
  label: string;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <Button
      fullWidth
      className={`filter-button ${selected ? 'button--primary' : ''}`}
      variant={selected ? 'filled' : 'default'}
      onClick={onToggle}
      styles={{
        ...(selected && {
          root: {
            padding: '4px 4px 4px 10px',
          },
        }),
      }}
      rightSection={
        selected ? (
          <ActionIcon
            size="sm"
            variant="subtle"
            className="button--primary"
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M1 1L13 13M13 1L1 13" />
            </svg>
          </ActionIcon>
        ) : null
      }
    >
      {label}
    </Button>
  );
}
