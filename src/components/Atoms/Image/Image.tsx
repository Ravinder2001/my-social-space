interface ImageComponentProps {
  src: string;
  alt: string;
  className: string;
  width?: number;
  height?: number;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ src, alt, width, height, className }) => {
  return <img src={src} alt={alt} width={width} height={height} className={className} />;
};

export default ImageComponent;
