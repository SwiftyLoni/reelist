import { useState } from 'react';
import type { Video } from '../../types/tmdb';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { Modal } from '../ui/Modal';
import './TrailerButton.css';

interface TrailerButtonProps {
  trailer: Video | undefined;
}

export function TrailerButton({ trailer }: TrailerButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!trailer) return null;

  return (
    <>
      <Button
        variant="secondary"
        icon={<Icon name="play" size={16} />}
        onClick={() => setIsOpen(true)}
      >
        Watch Trailer
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={trailer.name}>
        <div className="trailer-embed">
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
            title={trailer.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </Modal>
    </>
  );
}
