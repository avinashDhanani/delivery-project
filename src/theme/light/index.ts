import { css_var_prefix, hexToRGB } from "../utils";

export const createLightModeVariables = `
    :root {
        ${css_var_prefix}-white: ${hexToRGB("#FFFFFF")};
        ${css_var_prefix}-white-50: ${hexToRGB("#F1F1F1")};
    
        ${css_var_prefix}-black: ${hexToRGB("#000000")};
        ${css_var_prefix}-black-50: ${hexToRGB("#1B1E2C")};
        ${css_var_prefix}-black-100: ${hexToRGB("#333333")};

        ${css_var_prefix}-cyan: ${hexToRGB("#2EA295")};
        ${css_var_prefix}-cyan-50: ${hexToRGB("#E3FFF9")};
        ${css_var_prefix}-cyan-100: ${hexToRGB("#C4FAF4")};
        ${css_var_prefix}-cyan-150: ${hexToRGB("#F6FEFF")};
        ${css_var_prefix}-cyan-200: ${hexToRGB("#177D71")};

        ${css_var_prefix}-purple: ${hexToRGB("#604bb0")};
    }
`;
