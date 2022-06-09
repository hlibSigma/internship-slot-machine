export interface ConfigInterface {
  gameWidth: number;
  gameHeight: number;
  reelsPosition: { x: number; y: number };
  playButtonPosition: { x: number; y: number };
  balancePosition: { x: number; y: number };
  totalReels: number;
  reelSpinningCycles: number;
  reelSpinningSpeedFactor: number[];
  reelShuffleSpinningSpeedFactor: boolean;
  totalReelCells: number;
  reelCellHeight: number;
  reelCellWidth: number;
  reelVisibleCells: number;
  reelVerticalPadding: number;
  reelHorizontalMargin: number;
}
