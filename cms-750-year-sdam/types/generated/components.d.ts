import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksBlocks extends Struct.ComponentSchema {
  collectionName: 'components_blocks_blocks';
  info: {
    displayName: 'Blocks';
    icon: 'apps';
  };
  attributes: {
    Button: Schema.Attribute.Component<'clickables.button', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 2;
        },
        number
      >;
    Content: Schema.Attribute.RichText;
    Image: Schema.Attribute.Media<'images' | 'files'>;
    Title: Schema.Attribute.String;
    Type: Schema.Attribute.Enumeration<['text', 'text-image', 'cta']> &
      Schema.Attribute.DefaultTo<'text'>;
  };
}

export interface ClickablesButton extends Struct.ComponentSchema {
  collectionName: 'components_clickables_buttons';
  info: {
    displayName: 'Button';
    icon: 'cursor';
  };
  attributes: {
    Title: Schema.Attribute.String;
    URL: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.blocks': BlocksBlocks;
      'clickables.button': ClickablesButton;
    }
  }
}
