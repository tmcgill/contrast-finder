// from https://www.w3.org/TR/WCAG22/#dfn-contrast-ratio

function contrast(L1, L2) {
    L1 += .05;
    L2 += .05;
    return (L1 > L2) ? L1/L2 : L2/L1;
}