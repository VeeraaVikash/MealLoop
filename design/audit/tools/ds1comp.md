# ds1comp · DOOR-SCANNER D1 component builder (run once, 2026-10-17)

Built with `dsh` (tools/dsh.js) in two use_figma calls; IDs are stored in shared plugin data `mealloop/ds_ids`
(scanner, count, typeid, result, keypad, sostab, sospanel, role, tab, problem). Placed on page 03 under
"Label / Door Scanner components (2026-10)" from y 40500. Each set's description starts "DOOR SCANNER 2026-10 (new)".

- ScannerCard: 353 × 304 (Before 328), hero-bg, radius 32; brackets via D.brackets (inset 16, 5 pt, STRETCH constraints);
  torch 44 circle (on-hero 20 % / lime when on); dimmed QR via D.ico('qr'); prompt ML/Body; camera denied and offline use ML/Card Heading + ML/Secondary.
- CountTile: Small 170 × 84 (ML/Secondary label, ML/Metric value); Large 353 wide (ML/Hero Metric, lime "+1" chip).
- TypeIdButton 171 × 84 ink outline; ResultScreen circle 160 (Success) / 120, ML/Large Title + subtitle; KeyPad rows of 3, keys 64 / 52.
- SOSEdgeTab 58 × 108 left radius 24, badge 28; SOSPanel 353 auto; RoleRow / ProblemOption 353 auto, circle 64; StaffTabBar3 365 × 66.
