import { css_var_prefix, hexToRGB } from "../utils";

export const createDarkModeVariables = `
     :root:is(.dark) {
        ${css_var_prefix}-white: ${hexToRGB("#FFFFFF")};
        ${css_var_prefix}-white-50: ${hexToRGB("#F1F1F1")};
        ${css_var_prefix}-white-100: ${hexToRGB("#EAECF7")};
        ${css_var_prefix}-white-150: ${hexToRGB("#F6F8FB")};
        ${css_var_prefix}-white-200: ${hexToRGB("#FAFEFF")};
    
        ${css_var_prefix}-black: ${hexToRGB("#000000")};
        ${css_var_prefix}-black-50: ${hexToRGB("#232323")};
        ${css_var_prefix}-black-100: ${hexToRGB("#333333")};
        ${css_var_prefix}-black-150: ${hexToRGB("#A8ABAE")};

        ${css_var_prefix}-purple: ${hexToRGB("#928AAF")};
        ${css_var_prefix}-purple-50: ${hexToRGB("#8585A9")};

        ${css_var_prefix}-darkblue: ${hexToRGB("#233158")};

        ${css_var_prefix}-blue: ${hexToRGB("#4D86FF")};
    }
`;
