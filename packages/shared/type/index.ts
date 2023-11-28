export enum ContractorType {
  Unknow = "unknow",
  Architect = "architect",
  Geometer = "geometer",
  EngineeringOffice = "engineering_office",
  SoilStudy = "soil_study",
  TechnicalController = "technical_controller",
  Earthworks = "earthworks",
  Mason = "mason",
  Carpenter = "carpenter",
  Roofer = "roofer",
  ExteriorCarpenter = "exterior_carpenter",
  Facade = "facade",
  Electrician = "electrician",
  HeatingEngineer = "heating_engineer",
  Plumber = "plumber",
  Plasterer = "plasterer",
  Insulating = "insulating",
  DoorAndInteriorCarpentry = "door_and_interior_carpentry",
  TilesOrFloor = "tiles_or_floor",
  Paint = "paint"
}

export enum ContractorWorkStatus {
  Unknow = "unknow",
  InPlanning = "in_planning",
  NotStarted = "not_started",
  InProgress = "in_progress",
  ToCheck = "to_check",
  Finish = "finish"
}

export enum ContractorPaymentStatus {
  Unknow = "unknow",
  NotReady = "not_ready",
  Ready = "ready",
  InProgress = "in_progess",
  Done = "done",
  Problem = "problem"
}

export const ContractorPaymentStatusData = {
  [ContractorPaymentStatus.Unknow]: {
    color: "gray"
  },
  [ContractorPaymentStatus.NotReady]: {
    color: "orange"
  },
  [ContractorPaymentStatus.Ready]: {
    color: "yellow"
  },
  [ContractorPaymentStatus.InProgress]: {
    color: "blue"
  },
  [ContractorPaymentStatus.Done]: {
    color: "green"
  },
  [ContractorPaymentStatus.Problem]: {
    color: "red"
  },
}