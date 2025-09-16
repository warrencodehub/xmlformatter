export interface SummaryOfFee {
  pChargesNetOfApplicableVat: string;
  pSeniorCitizenDiscount: string;
  pPWDDiscount: string;
  pPCSO: string;
  pDSWD: string;
  pDOHMAP: string;
  pHMO: string;
}

export interface OtherFundSource {
  pDescription: string;
  pAmount: string;
}

export interface CategoryFee {
  SummaryOfFee: SummaryOfFee;
  OtherFundSource: OtherFundSource;
}

export interface PhilHealthTotal {
  pTotalCaseRateAmount: string;
}

export interface Balance {
  pAmount: string;
}

export interface SummaryOfFees {
  RoomAndBoard: CategoryFee;
  DrugsAndMedicine: CategoryFee;
  LaboratoryAndDiagnostic: CategoryFee;
  OperatingRoomFees: CategoryFee;
  MedicalSupplies: CategoryFee;
  Others: CategoryFee;
  PhilHealth: PhilHealthTotal;
  Balance: Balance;
}

export interface ProfessionalInfo {
  pPAN: string;
  pFirstName: string;
  pMiddleName: string;
  pLastName: string;
  pSuffixName: string;
}

export interface ProfessionalFee {
  ProfessionalInfo: ProfessionalInfo;
  SummaryOfFee: SummaryOfFee;
}

export interface ProfessionalFees {
  ProfessionalFee: ProfessionalFee | ProfessionalFee[];
  PhilHealth: PhilHealthTotal;
  Balance: Balance;
}

export interface ItemizedBillingItem {
  pServiceDate: string;
  pItemCode: string;
  pItemName: string;
  pUnitOfMeasurement: string;
  pUnitPrice: string;
  pQuantity: string;
  pTotalAmount: string;
  pCategory: string;
}

export interface ESOA {
  pHciPan: string;
  pHciTransmittalId: string;
  SummaryOfFees: SummaryOfFees;
  ProfessionalFees: ProfessionalFees;
  ItemizedBillingItems: {
    ItemizedBillingItem: ItemizedBillingItem[];
  };
}