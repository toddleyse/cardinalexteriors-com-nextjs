import HeroBlock from './pageBuilder/HeroBlock';
import HeadingBlock from './pageBuilder/HeadingBlock';
import ParagraphBlock from './pageBuilder/ParagraphBlock';
import ImageBlock from './pageBuilder/ImageBlock';
import ColumnsBlock from './pageBuilder/ColumnsBlock';
import MediaTextBlock from './pageBuilder/MediaTextBlock';
import CardGridBlock from './pageBuilder/CardGridBlock';
import FAQBlock from './pageBuilder/FAQBlock';
import ButtonsBlock from './pageBuilder/ButtonsBlock';
import CallToActionBlock from './pageBuilder/CallToActionBlock';
import TestimonialsBlock from './pageBuilder/TestimonialsBlock';
import GalleryBlock from './pageBuilder/GalleryBlock';
import SeparatorBlock from './pageBuilder/SeparatorBlock';
import SpacerBlock from './pageBuilder/SpacerBlock';
import FormBlock from './pageBuilder/FormBlock';

const blockComponents = {
  pbHero: HeroBlock,
  pbHeading: HeadingBlock,
  pbParagraph: ParagraphBlock,
  pbImage: ImageBlock,
  pbColumns: ColumnsBlock,
  pbMediaText: MediaTextBlock,
  pbCardGrid: CardGridBlock,
  pbFAQ: FAQBlock,
  pbButtons: ButtonsBlock,
  pbCallToAction: CallToActionBlock,
  pbTestimonials: TestimonialsBlock,
  pbGallery: GalleryBlock,
  pbSeparator: SeparatorBlock,
  pbSpacer: SpacerBlock,
  pbForm: FormBlock,
};

export default function BlockRenderer({ block }) {
  const Component = blockComponents[block._type];

  if (!Component) {
    if (process.env.NODE_ENV === 'development') {
      return (
        <div
          style={{
            padding: '1rem',
            margin: '1rem',
            border: '2px dashed #e03131',
            borderRadius: '8px',
            background: '#fff5f5',
            color: '#e03131',
            fontFamily: 'monospace',
            fontSize: '0.875rem',
          }}
        >
          Unknown block type: <strong>{block._type}</strong>
        </div>
      );
    }
    return null;
  }

  return <Component block={block} />;
}
