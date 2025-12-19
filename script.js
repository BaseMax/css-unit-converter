// Get DOM elements
const inputValue = document.getElementById('inputValue');
const fromUnit = document.getElementById('fromUnit');
const toUnit = document.getElementById('toUnit');
const resultValue = document.getElementById('resultValue');
const rootFontSize = document.getElementById('rootFontSize');
const viewportWidth = document.getElementById('viewportWidth');
const viewportHeight = document.getElementById('viewportHeight');
const parentFontSize = document.getElementById('parentFontSize');
const conversionTable = document.getElementById('conversionTable');

// Constants
const PT_TO_PX_RATIO = 4 / 3; // 1pt = 4/3px

/**
 * Convert any unit to pixels first (base unit)
 */
function toPixels(value, unit, settings) {
    const val = parseFloat(value);
    if (isNaN(val)) return 0;

    switch (unit) {
        case 'px':
            return val;
        case 'rem':
            return val * settings.rootFontSize;
        case 'em':
            return val * settings.parentFontSize;
        case 'vw':
            return (val * settings.viewportWidth) / 100;
        case 'vh':
            return (val * settings.viewportHeight) / 100;
        case 'percent':
            // For percentage, we assume it's relative to parent font size
            return (val * settings.parentFontSize) / 100;
        case 'pt':
            return val * PT_TO_PX_RATIO;
        default:
            return val;
    }
}

/**
 * Convert from pixels to target unit
 */
function fromPixels(pixels, unit, settings) {
    const px = parseFloat(pixels);
    if (isNaN(px)) return 0;

    switch (unit) {
        case 'px':
            return px;
        case 'rem':
            return px / settings.rootFontSize;
        case 'em':
            return px / settings.parentFontSize;
        case 'vw':
            return (px * 100) / settings.viewportWidth;
        case 'vh':
            return (px * 100) / settings.viewportHeight;
        case 'percent':
            // For percentage, we assume it's relative to parent font size
            return (px * 100) / settings.parentFontSize;
        case 'pt':
            return px / PT_TO_PX_RATIO;
        default:
            return px;
    }
}

/**
 * Convert between any two units
 */
function convertUnits(value, from, to, settings) {
    const pixels = toPixels(value, from, settings);
    return fromPixels(pixels, to, settings);
}

/**
 * Format number for display
 */
function formatNumber(num) {
    if (isNaN(num)) return '0';
    
    // Round to 4 decimal places and remove trailing zeros
    const rounded = Math.round(num * 10000) / 10000;
    return rounded.toString().replace(/\.?0+$/, '');
}

/**
 * Get current settings from inputs
 */
function getSettings() {
    return {
        rootFontSize: parseFloat(rootFontSize.value) || 16,
        viewportWidth: parseFloat(viewportWidth.value) || 1920,
        viewportHeight: parseFloat(viewportHeight.value) || 1080,
        parentFontSize: parseFloat(parentFontSize.value) || 16
    };
}

/**
 * Get unit display name
 */
function getUnitDisplayName(unit) {
    const unitNames = {
        'px': 'px',
        'rem': 'rem',
        'em': 'em',
        'vw': 'vw',
        'vh': 'vh',
        'percent': '%',
        'pt': 'pt'
    };
    return unitNames[unit] || unit;
}

/**
 * Update the main conversion result
 */
function updateResult() {
    const value = parseFloat(inputValue.value);
    if (isNaN(value)) {
        resultValue.textContent = '0 ' + getUnitDisplayName(toUnit.value);
        return;
    }

    const settings = getSettings();
    const result = convertUnits(value, fromUnit.value, toUnit.value, settings);
    const formattedResult = formatNumber(result);
    resultValue.textContent = formattedResult + ' ' + getUnitDisplayName(toUnit.value);
}

/**
 * Update the conversion table showing all unit conversions
 */
function updateConversionTable() {
    const value = parseFloat(inputValue.value);
    if (isNaN(value)) {
        conversionTable.innerHTML = '<div style="text-align: center; color: #999;">Enter a value to see conversions</div>';
        return;
    }

    const settings = getSettings();
    const from = fromUnit.value;
    const units = ['px', 'rem', 'em', 'vw', 'vh', 'percent', 'pt'];
    
    let tableHTML = '';
    
    units.forEach(unit => {
        if (unit === from) return; // Skip the source unit
        
        const result = convertUnits(value, from, unit, settings);
        const formattedResult = formatNumber(result);
        const displayUnit = getUnitDisplayName(unit);
        
        tableHTML += `
            <div class="conversion-row">
                <span class="unit-name">${displayUnit}</span>
                <span class="unit-value">${formattedResult} ${displayUnit}</span>
            </div>
        `;
    });
    
    conversionTable.innerHTML = tableHTML;
}

/**
 * Update all conversions
 */
function updateAll() {
    updateResult();
    updateConversionTable();
}

// Event listeners for instant feedback
inputValue.addEventListener('input', updateAll);
fromUnit.addEventListener('change', updateAll);
toUnit.addEventListener('change', updateAll);
rootFontSize.addEventListener('input', updateAll);
viewportWidth.addEventListener('input', updateAll);
viewportHeight.addEventListener('input', updateAll);
parentFontSize.addEventListener('input', updateAll);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set viewport dimensions to actual viewport if possible
    if (window.innerWidth && window.innerHeight) {
        viewportWidth.value = window.innerWidth;
        viewportHeight.value = window.innerHeight;
    }
    
    // Detect root font size
    const computedRootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    if (computedRootFontSize) {
        rootFontSize.value = computedRootFontSize;
    }
    
    updateAll();
});

// Update viewport dimensions on window resize
window.addEventListener('resize', () => {
    viewportWidth.value = window.innerWidth;
    viewportHeight.value = window.innerHeight;
    updateAll();
});
