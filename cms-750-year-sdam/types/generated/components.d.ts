import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksCallToActionCta extends Struct.ComponentSchema {
  collectionName: 'components_blocks_call_to_action_cta_s';
  info: {
    description: '';
    displayName: 'Call To Action (CTA)';
    icon: 'stack';
  };
  attributes: {
    Button: Schema.Attribute.Component<'clickables.button', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 2;
        },
        number
      >;
    Color: Schema.Attribute.Enumeration<
      [
        'sunny-yellow',
        'fiery-red',
        'leafy-green',
        'sky-blue',
        'royal-purple',
        'sunset-orange',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'sunny-yellow'>;
    Description: Schema.Attribute.RichText & Schema.Attribute.Required;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Title: Schema.Attribute.String;
  };
}

export interface BlocksForm extends Struct.ComponentSchema {
  collectionName: 'components_blocks_forms';
  info: {
    description: '';
    displayName: 'Form';
    icon: 'apps';
  };
  attributes: {
    form: Schema.Attribute.Relation<'oneToOne', 'api::form.form'>;
  };
}

export interface BlocksImage extends Struct.ComponentSchema {
  collectionName: 'components_blocks_images';
  info: {
    description: '';
    displayName: 'Image';
    icon: 'picture';
  };
  attributes: {
    Caption: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    Media: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface BlocksImageSlider extends Struct.ComponentSchema {
  collectionName: 'components_blocks_image_sliders';
  info: {
    description: '';
    displayName: 'Image Slider';
    icon: 'landscape';
  };
  attributes: {
    Images: Schema.Attribute.Media<'images' | 'files', true> &
      Schema.Attribute.Required;
  };
}

export interface BlocksText extends Struct.ComponentSchema {
  collectionName: 'components_blocks_texts';
  info: {
    description: '';
    displayName: 'Text';
    icon: 'feather';
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
    icon: 'layer';
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

export interface BlocksYouTubeVideo extends Struct.ComponentSchema {
  collectionName: 'components_blocks_you_tube_videos';
  info: {
    displayName: 'YouTube Video';
    icon: 'play';
  };
  attributes: {
    url: Schema.Attribute.String & Schema.Attribute.Required;
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

export interface DropdownOptionsDropdownOption extends Struct.ComponentSchema {
  collectionName: 'components_dropdown_options_dropdown_options';
  info: {
    displayName: 'DropdownOption';
  };
  attributes: {
    Name: Schema.Attribute.String & Schema.Attribute.Required;
    Value: Schema.Attribute.String & Schema.Attribute.Required;
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
    description: '';
    displayName: 'Categories Dropdown';
  };
  attributes: {
    categories: Schema.Attribute.Relation<
      'oneToMany',
      'api::category.category'
    >;
    label: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    required: Schema.Attribute.Boolean;
  };
}

export interface FormFieldsCheckbox extends Struct.ComponentSchema {
  collectionName: 'components_form_fields_checkboxes';
  info: {
    description: '';
    displayName: 'Checkbox';
  };
  attributes: {
    label: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    required: Schema.Attribute.Boolean;
  };
}

export interface FormFieldsDatePicker extends Struct.ComponentSchema {
  collectionName: 'components_form_fields_date_pickers';
  info: {
    displayName: 'DatePicker';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    required: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
  };
}

export interface FormFieldsDropdown extends Struct.ComponentSchema {
  collectionName: 'components_form_fields_dropdowns';
  info: {
    displayName: 'Dropdown';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    Options: Schema.Attribute.Component<
      'dropdown-options.dropdown-option',
      true
    > &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    required: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
  };
}

export interface FormFieldsEmail extends Struct.ComponentSchema {
  collectionName: 'components_form_fields_emails';
  info: {
    description: '';
    displayName: 'Email';
  };
  attributes: {
    label: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    required: Schema.Attribute.Boolean;
  };
}

export interface FormFieldsInfoText extends Struct.ComponentSchema {
  collectionName: 'components_form_fields_info_texts';
  info: {
    displayName: 'Info Text';
  };
  attributes: {
    Message: Schema.Attribute.Text;
  };
}

export interface FormFieldsNumber extends Struct.ComponentSchema {
  collectionName: 'components_form_fields_numbers';
  info: {
    description: '';
    displayName: 'Number';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    required: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
  };
}

export interface FormFieldsPassword extends Struct.ComponentSchema {
  collectionName: 'components_form_fields_passwords';
  info: {
    description: '';
    displayName: 'Password';
  };
  attributes: {
    label: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
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
    name: Schema.Attribute.String & Schema.Attribute.Required;
    required: Schema.Attribute.Boolean;
  };
}

export interface FormFieldsTextarea extends Struct.ComponentSchema {
  collectionName: 'components_form_fields_textareas';
  info: {
    description: '';
    displayName: 'Textarea';
  };
  attributes: {
    label: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    required: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface FormFieldsTimeSelect extends Struct.ComponentSchema {
  collectionName: 'components_form_fields_time_selects';
  info: {
    displayName: 'TimeSelect';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    required: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.call-to-action-cta': BlocksCallToActionCta;
      'blocks.form': BlocksForm;
      'blocks.image': BlocksImage;
      'blocks.image-slider': BlocksImageSlider;
      'blocks.text': BlocksText;
      'blocks.text-image': BlocksTextImage;
      'blocks.you-tube-video': BlocksYouTubeVideo;
      'clickables.button': ClickablesButton;
      'clickables.menu-item': ClickablesMenuItem;
      'dropdown-options.dropdown-option': DropdownOptionsDropdownOption;
      'footer.column': FooterColumn;
      'form-fields.categories-dropdown': FormFieldsCategoriesDropdown;
      'form-fields.checkbox': FormFieldsCheckbox;
      'form-fields.date-picker': FormFieldsDatePicker;
      'form-fields.dropdown': FormFieldsDropdown;
      'form-fields.email': FormFieldsEmail;
      'form-fields.info-text': FormFieldsInfoText;
      'form-fields.number': FormFieldsNumber;
      'form-fields.password': FormFieldsPassword;
      'form-fields.text': FormFieldsText;
      'form-fields.textarea': FormFieldsTextarea;
      'form-fields.time-select': FormFieldsTimeSelect;
    }
  }
}
