import Image from 'next/image';

export default function ProjectImages({ images, title }: { images: string[]; title: string }) {
  if (!images || images.length === 0 || !images[0]) return null;

  return (
    <div className="mb-8 overflow-hidden rounded-lg">
      <Image src={images[0]} alt={title} width={1200} height={675} className="w-full h-auto" priority />
      {images.slice(1).map((image, index) => (
        <Image
          key={index}
          src={image}
          alt={`${title} - Detail ${index + 1}`}
          width={1200}
          height={675}
          className="w-full h-auto mt-4"
        />
      ))}
    </div>
  );
}
