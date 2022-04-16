export type Language =
  | 'Afrikaans'
  | 'Albanian'
  | 'Amharic'
  | 'Arabic'
  | 'Armenian'
  | 'Azerbaijani'
  | 'Basque'
  | 'Belarusian'
  | 'Bengali'
  | 'Bosnian'
  | 'Bulgarian'
  | 'Catalan'
  | 'Cebuano'
  | 'Chichewa'
  | 'Chinese (Simplified)'
  | 'Chinese (Traditional)'
  | 'Corsican'
  | 'Croatian'
  | 'Czech'
  | 'Danish'
  | 'Dutch'
  | 'English'
  | 'Esperanto'
  | 'Estonian'
  | 'Filipino'
  | 'Finnish'
  | 'French'
  | 'Frisian'
  | 'Galician'
  | 'Georgian'
  | 'German'
  | 'Greek'
  | 'Gujarati'
  | 'Haitian Creole'
  | 'Hausa'
  | 'Hawaiian'
  | 'Hebrew'
  | 'Hebrew'
  | 'Hindi'
  | 'Hmong'
  | 'Hungarian'
  | 'Icelandic'
  | 'Igbo'
  | 'Indonesian'
  | 'Irish'
  | 'Italian'
  | 'Japanese'
  | 'Javanese'
  | 'Kannada'
  | 'Kazakh'
  | 'Khmer'
  | 'Korean'
  | 'Kurdish (Kurmanji)'
  | 'Kyrgyz'
  | 'Lao'
  | 'Latin'
  | 'Latvian'
  | 'Lithuanian'
  | 'Luxembourgish'
  | 'Macedonian'
  | 'Malagasy'
  | 'Malay'
  | 'Malayalam'
  | 'Maltese'
  | 'Maori'
  | 'Marathi'
  | 'Mongolian'
  | 'Myanmar (Burmese)'
  | 'Nepali'
  | 'Norwegian'
  | 'Pashto'
  | 'Persian'
  | 'Polish'
  | 'Portuguese'
  | 'Punjabi'
  | 'Romanian'
  | 'Russian'
  | 'Samoan'
  | 'Scots Gaelic'
  | 'Serbian'
  | 'Sesotho'
  | 'Shona'
  | 'Sindhi'
  | 'Sinhala'
  | 'Slovak'
  | 'Slovenian'
  | 'Somali'
  | 'Spanish'
  | 'Sundanese'
  | 'Swahili'
  | 'Swedish'
  | 'Tajik'
  | 'Tamil'
  | 'Telugu'
  | 'Thai'
  | 'Turkish'
  | 'Ukrainian'
  | 'Urdu'
  | 'Uzbek'
  | 'Vietnamese'
  | 'Welsh'
  | 'Xhosa'
  | 'Yiddish'
  | 'Yoruba'
  | 'Zulu';

export type Translate = 'text' | 'message' | 'wikipedia' | 'joke';

export interface Chain {
  name: string;
  description: string;
  emoji?: string;
  languages: Language[];
}

export interface BooblMessage {
  translate: Translate;
  jokeLanguage?: 'French' | 'English';
  text: {
    original: string;
    translated: string;
    steps: string[];
  };
  to: Language;
  date: string;
  chain: string;
  serverID: string;
  userID: string;
  public: boolean;
  inNotion: boolean;
  isPublic: boolean;
  notionURL?: string;
}

export interface BooblUser {
  visibility: boolean;
  share: 'private' | 'unlisted' | 'public';
  defaults: {
    to: Language;
    chain: string;
  };
  messages: string[];
}

export interface BooblServer {
  visibleOn: 'none' | 'channel' | 'server';
  channel: string;
  defaultLanguage: Language;
}
