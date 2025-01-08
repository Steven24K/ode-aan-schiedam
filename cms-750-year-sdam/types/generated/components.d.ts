import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksCallToActionCta extends Struct.ComponentSchema {
  collectionName: 'components_blocks_call_to_action_cta_s';
  info: {
    displayName: 'Call To Action (CTA)';
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
    Description: Schema.Attribute.RichText & Schema.Attribute.Required;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Title: Schema.Attribute.String;
  };
}

export interface BlocksText extends Struct.ComponentSchema {
  collectionName: 'components_blocks_texts';
  info: {
    displayName: 'Text';
    icon: 'apps';
  };
  attributes: {
    Description: Schema.Attribute.RichText & Schema.Attribute.Required;
    Title: Schema.Attribute.String;
  };
}

export interface BlocksTextImage extends Struct.ComponentSchema {
  collectionName: 'components_blocks_text_images';
  info: {
    displayName: 'Text + Image';
    icon: 'apps';
  };
  attributes: {
    Description: Schema.Attribute.RichText & Schema.Attribute.Required;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    Title: Schema.Attribute.String;
  };
}

export interface ClickablesButton extends Struct.ComponentSchema {
  collectionName: 'components_clickables_buttons';
  info: {
    description: '';
    displayName: 'Button';
    icon: 'cursor';
  };
  attributes: {
    Title: Schema.Attribute.String & Schema.Attribute.Required;
    URL: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.call-to-action-cta': BlocksCallToActionCta;
      'blocks.text': BlocksText;
      'blocks.text-image': BlocksTextImage;
      'clickables.button': ClickablesButton;
    }
  }
}
