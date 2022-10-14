/**
 * AutoNumeric.js typescript definition file.
 * AutoNumeric version:     4.0.2
 *
 */

declare var AutoNumeric: autoNumeric.AutoNumeric;

declare namespace autoNumeric {
  export interface AutoNumeric {
    new (domElement: HTMLElement | string, userOptions: autoNumeric.options): AutoNumeric;
    //new(domElement: string, multiplOptions: Array<string | autoNumeric.options>): AutoNumeric;
    //new(domElement: string, initialValue: number | string | null): AutoNumeric;
    //new(domElement: string, initialValue: number | string | null, userOptions: autoNumeric.options): AutoNumeric;
    //new(domElement: string, initialValue: number | string | null, multiplOptions: Array<string | autoNumeric.options>): AutoNumeric;

    options: optionsStatic;

    //methods
    set: (value: string | number, options?: autoNumeric.options, saveState?: boolean) => void;
    setUnformatted: (value: string | number, options?: autoNumeric.options) => void;
    getNumericString: () => string;
    get: () => string;
    getFormatted: () => string;
    getNumber: () => number;
    getLocalized: (forcedOutputFormat?: string, callback?: () => void) => string;
    //getLocalized: (callback?: () => void) => string;
    reformat: () => void;
    unformat: () => void;
    unformatLocalized: (forcedOutputFormat?: string) => void;
    isPristine: () => boolean;
    select: () => void;
    selectNumber: () => void;
    selectInteger: () => void;
    selectDecimal: () => void;
    clear: (all?: boolean) => void;

    //uninitialize the autnumeric element
    remove: () => void;
    wipe: () => void;
    nuke: () => void;

    //node manipulation
    node: Element;
    parent: Element;
    detach: (element?: string) => void;
    attach: (element?: string, reFormat?: boolean) => void;
  }

  export interface allowDecimalPadding {
    always: true;
    never: false;
    floats: "floats";
  }
  export interface caretPositionOnFocus {
    start: "start";
    end: "end";
    decimalLeft: "decimalLeft";
    decimalRight: "decimalRight";
    doNoForceCaretPosition: null;
  }
  export interface createLocalList {
    createList: true;
    doNotCreateList: false;
  }
  export interface currencySymbol {
    none: "";
    currencySign: "¤";
    austral: "₳";
    australCentavo: "¢";
    baht: "฿";
    cedi: "₵";
    cent: "¢";
    colon: "₡";
    cruzeiro: "₢";
    dollar: "$";
    dong: "₫";
    drachma: "₯";
    dram: "​֏";
    european: "₠";
    euro: "€";
    florin: "ƒ";
    franc: "₣";
    guarani: "₲";
    hryvnia: "₴";
    kip: "₭";
    att: "ອັດ";
    lepton: "Λ.";
    lira: "₺";
    liraOld: "₤";
    lari: "₾";
    mark: "ℳ";
    mill: "₥";
    naira: "₦";
    peseta: "₧";
    peso: "₱";
    pfennig: "₰";
    pound: "£";
    real: "R$";
    riel: "៛";
    ruble: "₽";
    rupee: "₹";
    rupeeOld: "₨";
    shekel: "₪";
    shekelAlt: "ש״ח‎‎";
    taka: "৳";
    tenge: "₸";
    togrog: "₮";
    won: "₩";
    yen: "¥";
  }
  export interface currencySymbolPlacement {
    prefix: "p";
    suffix: "s";
  }
  export interface decimalCharacter {
    comma: ",";
    dot: ".";
    middleDot: "·";
    arabicDecimalSeparator: "٫";
    decimalSeparatorKeySymbol: "⎖";
  }
  export interface decimalCharacterAlternative {
    none: null;
    comma: ",";
    dot: ".";
  }
  export interface decimalPlaces {
    none: 0;
    one: 1;
    two: 2;
    three: 3;
    four: 4;
    five: 5;
    six: 6;
  }
  export interface decimalPlacesRawValue {
    useDefault: null;
    none: 0;
    one: 1;
    two: 2;
    three: 3;
    four: 4;
    five: 5;
    six: 6;
  }
  export interface decimalPlacesShownOnBlur {
    useDefault: null;
    none: 0;
    one: 1;
    two: 2;
    three: 3;
    four: 4;
    five: 5;
    six: 6;
  }
  export interface decimalPlacesShownOnFocus {
    useDefault: null;
    none: 0;
    one: 1;
    two: 2;
    three: 3;
    four: 4;
    five: 5;
    six: 6;
  }
  export interface defaultValueOverride {
    doNotOverride: null;
  }
  export interface digitalGroupSpacing {
    two: "2";
    twoScaled: "2s";
    three: "3";
    four: "4";
  }
  export interface digitGroupSeparator {
    comma: ",";
    dot: ".";
    normalSpace: " ";
    thinSpace: "\u2009";
    narrowNoBreakSpace: "\u202f";
    noBreakSpace: "\u00a0";
    noSeparator: "";
    apostrophe: "'";
    arabicThousandsSeparator: "٬";
    dotAbove: "˙";
  }
  export interface divisorWhenUnfocused {
    none: null;
    percentage: 100;
    permille: 1000;
    basisPoint: 10000;
  }
  export interface emptyInputBehavior {
    null: "null";
    focus: "focus";
    press: "press";
    always: "always";
    zero: "zero";
  }
  export interface failOnUnknownOption {
    fail: true;
    ignore: false;
  }
  export interface formatOnPageLoad {
    format: true;
    doNotFormat: false;
  }
  export interface historySize {
    verySmall: 5;
    small: 10;
    medium: 20;
    large: 50;
    veryLarge: 100;
    insane: number;
  }
  export interface isCancellable {
    cancellable: true;
    notCancellable: false;
  }
  export interface leadingZero {
    allow: "allow";
    deny: "deny";
    keep: "keep";
  }
  export interface maximumValue {
    tenTrillions: "9999999999999.99";
    tenTrillionsNoDecimals: "9999999999999";
    oneBillion: "999999999.99";
    zero: "0";
  }
  export interface minimumValue {
    tenTrillions: "-9999999999999.99";
    tenTrillionsNoDecimals: "-9999999999999";
    oneBillion: "-999999999.99";
    zero: "0";
  }
  export interface modifyValueOnWheel {
    modifyValue: true;
    doNothing: false;
  }
  export interface negativeBracketsTypeOnBlur {
    parentheses: "(,)";
    brackets: "[,]";
    chevrons: "<,>";
    curlyBraces: "{,}";
    angleBrackets: "〈,〉";
    japaneseQuotationMarks: "｢,｣";
    halfBrackets: "⸤,⸥";
    whiteSquareBrackets: "⟦,⟧";
    quotationMarks: "‹,›";
    guillemets: "«,»";
    none: null;
  }
  export interface negativePositiveSignPlacement {
    prefix: "p";
    suffix: "s";
    left: "l";
    right: "r";
    none: null;
  }
  export interface noEventListeners {
    noEvents: true;
    addEvents: false;
  }
  export interface onInvalidPaste {
    error: "error";
    ignore: "ignore";
    clamp: "clamp";
    truncate: "truncate";
    replace: "replace";
  }
  export interface outputFormat {
    string: "string";
    number: "number";
    dot: ".";
    negativeDot: "-.";
    comma: ",";
    negativeComma: "-,";
    dotNegative: ".-";
    commaNegative: ",-";
    none: null;
  }
  export interface overrideMinMaxLimits {
    ceiling: "ceiling";
    floor: "floor";
    ignore: "ignore";
    doNotOverride: null;
  }
  export interface rawValueDivisor {
    none: null;
    percentage: 100;
    permille: 1000;
    basisPoint: 10000;
  }
  export interface readOnly {
    readOnly: true;
    readWrite: false;
  }
  export interface roundingMethod {
    halfUpSymmetric: "S";
    halfUpAsymmetric: "A";
    halfDownSymmetric: "s";
    halfDownAsymmetric: "a";
    halfEvenBankersRounding: "B";
    upRoundAwayFromZero: "U";
    downRoundTowardZero: "D";
    toCeilingTowardPositiveInfinity: "C";
    toFloorTowardNegativeInfinity: "F";
    toNearest05: "N05";
    toNearest05Alt: "CHF";
    upToNext05: "U05";
    downToNext05: "D05";
  }
  export interface saveValueToSessionStorage {
    save: true;
    doNotSave: false;
  }
  export interface selectNumberOnly {
    selectNumbersOnly: true;
    selectAll: false;
  }
  export interface selectOnFocus {
    select: true;
    doNotSelect: false;
  }
  export interface serializeSpaces {
    plus: "+";
    percent: "%20";
  }
  export interface showOnlyNumbersOnFocus {
    onlyNumbers: true;
    showAll: false;
  }
  export interface showPositiveSign {
    show: true;
    hide: false;
  }
  export interface showWarnings {
    show: true;
    hide: false;
  }
  export interface styleRules {
    none: null;
    positiveNegative: { positive: "autoNumeric-positive"; negative: { "autoNumeric-negative" } };
  }
  export interface suffixText {
    none: "";
    percentage: "%";
    permille: "‰";
    basisPoint: "‱";
  }
  export interface symbolWhenUnfocused {
    none: null;
    percentage: "%";
    permille: "‰";
    basisPoint: "‱";
  }
  export interface unformatOnHover {
    unformat: true;
    doNotUnformat: false;
  }
  export interface unformatOnSubmit {
    unformat: true;
    keepCurrentValue: false;
  }
  export interface wheelStep {
    progressive: "progressive";
  }
  export interface optionsStatic {
    //evenOdd?: evenOdd;
    //positiveNegative?: positiveNegative;
    //range0To100With4Steps?: range0To100With4Steps;
    //rangeSmallAndZero?: rangeSmallAndZero;
    //styleRules?: styleRules;
    allowDecimalPadding?: allowDecimalPadding;
    caretPositionOnFocus?: caretPositionOnFocus;
    createLocalList?: createLocalList;
    currencySymbol?: currencySymbol;
    currencySymbolPlacement?: currencySymbolPlacement;
    decimalCharacter?: decimalCharacter;
    decimalCharacterAlternative?: decimalCharacterAlternative;
    decimalPlaces?: decimalPlaces;
    decimalPlacesRawValue?: decimalPlacesRawValue;
    decimalPlacesShownOnBlur?: decimalPlacesShownOnBlur;
    decimalPlacesShownOnFocus?: decimalPlacesShownOnFocus;
    defaultValueOverride?: defaultValueOverride;
    digitalGroupSpacing?: digitalGroupSpacing;
    digitGroupSeparator?: digitGroupSeparator;
    divisorWhenUnfocused?: divisorWhenUnfocused;
    emptyInputBehavior?: emptyInputBehavior;
    failOnUnknownOption?: failOnUnknownOption;
    formatOnPageLoad?: formatOnPageLoad;
    historySize?: historySize;
    isCancellable?: isCancellable;
    leadingZero?: leadingZero;
    maximumValue?: maximumValue;
    minimumValue?: minimumValue;
    modifyValueOnWheel?: modifyValueOnWheel;
    negativeBracketsTypeOnBlur?: negativeBracketsTypeOnBlur;
    negativePositiveSignPlacement?: negativePositiveSignPlacement;
    noEventListeners?: noEventListeners;
    onInvalidPaste?: onInvalidPaste;
    outputFormat?: outputFormat;
    overrideMinMaxLimits?: overrideMinMaxLimits;
    rawValueDivisor?: rawValueDivisor;
    readOnly?: readOnly;
    roundingMethod?: roundingMethod;
    saveValueToSessionStorage?: saveValueToSessionStorage;
    selectNumberOnly?: selectNumberOnly;
    selectOnFocus?: selectOnFocus;
    serializeSpaces?: serializeSpaces;
    showOnlyNumbersOnFocus?: showOnlyNumbersOnFocus;
    showPositiveSign?: showPositiveSign;
    showWarnings?: showWarnings;
    suffixText?: suffixText;
    symbolWhenUnfocused?: symbolWhenUnfocused;
    unformatOnHover?: unformatOnHover;
    unformatOnSubmit?: unformatOnSubmit;
    wheelStep?: wheelStep;
  }

  export interface options {
    allowDecimalPadding?: boolean | "floats";
    carePositionOnFocus?:
      | "start"
      | "end"
      | "decimalLeft"
      | "decimalRight"
      | "doNoForceCaretPosition";
    createLocalList?: boolean;
    currencySymbol?:
      | ""
      | "¤"
      | "₳"
      | "¢"
      | "฿"
      | "₵"
      | "¢"
      | "₡"
      | "₢"
      | "$"
      | "₫"
      | "₯"
      | "​֏"
      | "₠"
      | "€"
      | "ƒ"
      | "₣"
      | "₲"
      | "₴"
      | "₭"
      | "ອັດ"
      | "Λ."
      | "₺"
      | "₤"
      | "₾"
      | "ℳ"
      | "₥"
      | "₦"
      | "₧"
      | "₱"
      | "₰"
      | "£"
      | "R$"
      | "៛"
      | "₽"
      | "₹"
      | "₨"
      | "₪"
      | "ש״ח‎‎"
      | "৳"
      | "₸"
      | "₮"
      | "₩"
      | "¥";
    currencySymbolPlacement?: "p" | "s";
    decimalCharacter?: "," | "." | "·" | "٫" | "⎖";
    decimalCharacterAlternative?: null | "," | ".";
    decimalPlaces?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    decimalPlacesRawValue?: null | 0 | 1 | 2 | 3 | 4 | 5 | 6;
    decimalPlacesShownOnBlur?: null | 0 | 1 | 2 | 3 | 4 | 5 | 6;
    decimalPlacesShownOnFocus?: null | 0 | 1 | 2 | 3 | 4 | 5 | 6;
    defaultValueOverride?: null;
    digitalGroupSpacing?: "2" | "2s" | "3" | "4";
    digitGroupSeparator?: "," | "." | " " | "\u2009" | "\u202f" | "\u00a0" | "" | "'" | "٬" | "˙";
    divisorWhenUnfocused?: null | 100 | 1000 | 10000;
    emptyInputBehavior?: "null" | "focus" | "press" | "always" | "zero";
    failOnUnknownOption?: boolean;
    formatOnPageLoad?: boolean;
    historySize?: 5 | 10 | 20 | 50 | 100 | number;
    isCancellable?: boolean;
    leadingZero?: "allow" | "deny" | "keep";
    maximumValue?: "9999999999999.99" | "9999999999999" | "999999999.99" | "0";
    minimumValue?: "-9999999999999.99" | "-9999999999999" | "-999999999.99" | "0";
    modifyValueOnWheel?: boolean;
    negativeBracketsTypeOnBlur?:
      | "()"
      | "[]"
      | "<>"
      | "{}"
      | "〈〉"
      | "｢｣"
      | "⸤⸥"
      | "⟦⟧"
      | "‹›"
      | "«»"
      | null;
    negativePositiveSignPlacement?: "p" | "s" | "l" | "r" | null;
    noEventListeners?: boolean;
    onInvalidPaste?: "error" | "ignore" | "clamp" | "truncate" | "replace";
    outputFormat?: "string" | "number" | "." | "-." | "," | "-," | ".-" | ",-" | null;
    overrideMinMaxLimits?: "ceiling" | "floor" | "ignore" | null;
    rawValueDivisor?: null | 100 | 1000 | 10000;
    readOnly?: boolean;
    roundingMethod?:
      | "S"
      | "A"
      | "s"
      | "a"
      | "B"
      | "U"
      | "D"
      | "C"
      | "F"
      | "N05"
      | "CHF"
      | "U05"
      | "D05";
    saveValueToSessionStorage?: boolean;
    selectNumberOnly?: boolean;
    selectOnFocus?: boolean;
    serializeSpaces?: "+" | "%20";
    showOnlyNumbersOnFocus?: boolean;
    showPositiveSign?: boolean;
    showWarnings?: boolean;
    styleRules?: any;
    suffixText?: "" | "%" | "‰" | "‱";
    symbolWhenUnfocused?: "" | "%" | "‰" | "‱";
    unformatOnHover?: boolean;
    unformatOnSubmit?: boolean;
    wheelStep?: "progressive";
  }
}
