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

export interface BlocksForm extends Struct.ComponentSchema {
  collectionName: 'components_blocks_forms';
  info: {
    displayName: 'Form';
  };
  attributes: {
    form: Schema.Attribute.Relation<'oneToOne', 'api::form.form'>;
  };
}

export interface BlocksPoemForm extends Struct.ComponentSchema {
  collectionName: 'components_blocks_poem_forms';
  info: {
    displayName: 'Poem Form';
  };
  attributes: {
    Description: Schema.Attribute.Text;
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
    description: '';
    displayName: 'Text + Image';
    icon: 'apps';
  };
  attributes: {
    Description: Schema.Attribute.RichText & Schema.Attribute.Required;
    Direction: Schema.Attribute.Enumeration<['Left', 'Right']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Left'>;
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

export interface ClickablesMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_clickables_menu_items';
  info: {
    displayName: 'Menu Item';
    icon: 'arrowRight';
  };
  attributes: {
    Title: Schema.Attribute.String & Schema.Attribute.Required;
    URL: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FooterColumn extends Struct.ComponentSchema {
  collectionName: 'components_footer_columns';
  info: {
    displayName: 'Column';
    icon: 'apps';
  };
  attributes: {
    Items: Schema.Attribute.Component<'clickables.menu-item', true>;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FormFieldsCategoriesDropdown extends Struct.ComponentSchema {
  collectionName: 'components_form_fields_categories_dropdowns';
  info: {
    displayName: 'Categories Dropdown';
  };
  attributes: {
    categories: Schema.Attribute.Relation<
      'oneToMany',
      'api::category.category'
    >;
    label: Schema.Attribute.String;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    required: Schema.Attribute.Boolean;
  };
}

export interface FormFieldsCheckbox extends Struct.ComponentSchema {
  collectionName: 'components_form_fields_checkboxes';
  info: {
    displayName: 'Checkbox';
  };
  attributes: {
    label: Schema.Attribute.String;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    required: Schema.Attribute.Boolean;
  };
}

export interface FormFieldsEmail extends Struct.ComponentSchema {
  collectionName: 'components_form_fields_emails';
  info: {
    displayName: 'Email';
  };
  attributes: {
    label: Schema.Attribute.String;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    required: Schema.Attribute.Boolean;
  };
}

export interface FormFieldsPassword extends Struct.ComponentSchema {
  collectionName: 'components_form_fields_passwords';
  info: {
    displayName: 'Password';
  };
  attributes: {
    label: Schema.Attribute.String;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    required: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface FormFieldsText extends Struct.ComponentSchema {
  collectionName: 'components_form_fields_texts';
  info: {
    description: '';
    displayName: 'Text';
  };
  attributes: {
    label: Schema.Attribute.String;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    required: Schema.Attribute.Boolean;
  };
}

export interface FormFieldsTextarea extends Struct.ComponentSchema {
  collectionName: 'components_form_fields_textareas';
  info: {
    displayName: 'Textarea';
  };
  attributes: {
    label: Schema.Attribute.String;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    required: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.call-to-action-cta': BlocksCallToActionCta;
      'blocks.form': BlocksForm;
      'blocks.poem-form': BlocksPoemForm;
      'blocks.text': BlocksText;
      'blocks.text-image': BlocksTextImage;
      'clickables.button': ClickablesButton;
      'clickables.menu-item': ClickablesMenuItem;
      'footer.column': FooterColumn;
      'form-fields.categories-dropdown': FormFieldsCategoriesDropdown;
      'form-fields.checkbox': FormFieldsCheckbox;
      'form-fields.email': FormFieldsEmail;
      'form-fields.password': FormFieldsPassword;
      'form-fields.text': FormFieldsText;
      'form-fields.textarea': FormFieldsTextarea;
    }
  }
}
