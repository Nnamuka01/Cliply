/// <reference types="vite/client" />

//  import { SupabaseClient } from "@supabase/supabase-js";

declare module JSX {
    interface IntrinsicElements {
      "ion-icon": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          name?: string;
          className?: string;
          defaultChecked?: boolean;
          // animatedElementRef?: string | boolean;
        },
        HTMLElement
      >; //give specific type if available
    }
    interface Window {
      REACT_APP_BITLY_TOKEN?: string;
    }
  }
  
  declare module "*.js" {
    const value: string;
    const auth: any;
    const googleProvider: any;
    export default value;
    export { auth, googleProvider };
    const supabase: any;
    export { supabase };
  }