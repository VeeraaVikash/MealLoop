# Component inventory · Brand audit A1 (2026-10-08)

Page 03 Components (44:5355). 135 main components and sets: 97 component sets and 38 single components. Counts are live instances, read with `figma.skipInvisibleInstanceChildren = false`, nested instances included. Data is stored in shared plugin data `mealloop/a1_rows`, `a1_cnt_*`, `a1_detached`.

Columns: **04** Student Light, **05** Student Dark, **07** Prototype, **09** Mess staff, **10** Admin (incl. the AD-4f section), **03** Components (doc and spec instances), **99** Archive. Pages 02, 06, 08, 11 and 00 are in `a1_cnt_other` and do not change any status. **Desc** is 1 when the description field is filled.

Status: *in use* (has instances on 04/05/07/09/10); *nested only* (only used on page 03, mostly inside other components' specs); *archive only* (instances only in 99); *unused* (0 instances anywhere).

| Status | Count |
|---|---|
| in use | 120 |
| nested only | 5 |
| archive only | 5 |
| unused | 5 |

## Full list

| # | Component | Id | Kind | Variants | Properties | Desc | 04 | 05 | 07 | 09 | 10 | 03 | 99 | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Symbol | 73:163 | set | 55 | Name:VARIANT[house/house.fill/fork.knife/person.2/…] | 1 | 3562 | 3433 | 2656 | 535 | 2273 | 457 | 1554 | in use |
| 2 | Button | 74:81 | set | 12 | Label:TEXT; Show Icon:BOOLEAN; Icon:INSTANCE_SWAP; Style:VARIANT[Primary/Secondary/Text]; State:VARIANT[Default/Pressed/Disabled/Loading] | 1 | 144 | 144 | 128 | 61 | 133 | 44 | 92 | in use |
| 3 | GlassButton | 74:101 | set | 3 | Icon:INSTANCE_SWAP; Kind:VARIANT[Icon]; State:VARIANT[Default/Pressed/Disabled] | 1 | 836 | 836 | 676 | 143 | 473 | 23 | 343 | in use |
| 4 | NavHeader | 74:136 | set | 2 | Title:TEXT; Subtitle:TEXT; Show Subtitle:BOOLEAN; Show Back:BOOLEAN; Show Trailing:BOOLEAN; Show Trailing 2:BOOLEAN; Type:VARIANT[Large Title/…] | 1 | 216 | 216 | 184 | 45 | 129 | 1 | 80 | in use |
| 5 | TabBar | 74:236 | set | 9 | State:VARIANT[Expanded/Minimized]; Selected:VARIANT[Home/Meals/Community/You/Search] | 1 | 210 | 210 | 158 | 0 | 0 | 1 | 52 | in use |
| 6 | GlassSheet | 74:275 | set | 2 | Title:TEXT; Show Close:BOOLEAN; Detent:VARIANT[Medium/Large] | 1 | 36 | 36 | 35 | 0 | 33 | 1 | 11 | in use |
| 7 | ScrollEdge | 74:288 | set | 2 | Mode:VARIANT[Light/Dark] | 1 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | nested only; duplicate of ScrollEdgeFade (Plain/Wash) |
| 8 | SegmentedControl | 74:326 | set | 5 | Label 1:TEXT; Label 2:TEXT; Label 3:TEXT; Items:VARIANT[2/3]; Selected:VARIANT[1/2/3] | 1 | 38 | 38 | 26 | 0 | 10 | 2 | 5 | in use |
| 9 | StatusTag | 75:177 | set | 19 | Status:VARIANT[Available/Expired/Not eligible/Wrong mess/Saved/Sending/Failed/Reopened/Offline/Coming soon/Sent/Seen/Working on it/Fixed/…] | 1 | 1 | 1 | 1 | 0 | 0 | 2 | 18 | in use; overlaps StatusPill |
| 10 | Toast | 75:225 | set | 2 | Message:TEXT; Type:VARIANT[Success/Error] | 1 | 9 | 9 | 5 | 0 | 0 | 1 | 6 | in use |
| 11 | Skeleton | 75:239 | set | 4 | Shape:VARIANT[Line/Block/Circle/Card] | 1 | 40 | 40 | 35 | 0 | 0 | 1 | 20 | in use |
| 12 | FormField | 75:332 | set | 6 | Label:TEXT; Value:TEXT; Helper:TEXT; Show Helper:BOOLEAN; State:VARIANT[Default/Focused/Filled/Error/Disabled/Locked] | 1 | 41 | 41 | 38 | 0 | 52 | 5 | 12 | in use |
| 13 | SettingsRow | 75:379 | set | 4 | Title:TEXT; Detail:TEXT; Show Detail:BOOLEAN; Icon:INSTANCE_SWAP; Type:VARIANT[Toggle On/Toggle Off/Link/Locked] | 1 | 158 | 158 | 127 | 0 | 47 | 1 | 32 | in use |
| 14 | NotificationRow | 75:408 | set | 2 | Title:TEXT; Detail:TEXT; Time:TEXT; State:VARIANT[Unread/Read] | 1 | 13 | 13 | 13 | 0 | 0 | 1 | 0 | in use |
| 15 | IntentChoice | 77:183 | set | 10 | Label:TEXT; Surface:VARIANT[On dark/On light]; State:VARIANT[Default/Selected/Pending/Disabled/Sending] | 1 | 186 | 186 | 120 | 0 | 0 | 65 | 80 | in use |
| 16 | MealHero | 77:282 | set | 23 | Meal:TEXT; Menu:TEXT; Question:TEXT; State:VARIANT[No response/Sending/Failed/Cutoff passed/Unavailable/In/Skipping/Not sure yet/…] | 1 | 73 | 73 | 46 | 0 | 0 | 1 | 28 | in use |
| 17 | ReasonPicker | 77:309 | set | 2 | Label:TEXT; State:VARIANT[Default/Selected] | 1 | 41 | 41 | 33 | 0 | 27 | 6 | 38 | in use |
| 18 | AtMessTile | 77:340 | set | 4 | Type:VARIANT[Attendance/Pass Available/Pass Redeemed/Pass Now] | 1 | 76 | 76 | 46 | 0 | 0 | 1 | 56 | in use; Pass variants overlap SpecialPassTile |
| 19 | CrowdDial | 77:518 | set | 15 | Size:VARIANT[Compact/Full]; Level:VARIANT[Quiet/Stale/Unavailable/Getting busy/Packed]; Surface:VARIANT[On light/On dark] | 1 | 86 | 86 | 56 | 0 | 4 | 7 | 36 | in use |
| 20 | CrowdRow | 77:627 | set | 4 | State:VARIANT[Level/Stale/Unavailable/Closed] | 1 | 82 | 82 | 52 | 0 | 0 | 1 | 28 | in use |
| 21 | FollowUpCard | 77:673 | set | 3 | Type:VARIANT[Recheck/Report update/Info request] | 1 | 45 | 45 | 24 | 0 | 0 | 1 | 16 | in use |
| 22 | ShareBar | 77:714 | set | 2 | Unserved value:TEXT; State:VARIANT[Measured/Plate not measured] | 1 | 63 | 63 | 36 | 0 | 0 | 4 | 16 | in use |
| 23 | ImpactCard | 77:814 | set | 2 | Value:TEXT; Caption:TEXT; State:VARIANT[Measured/Plate not measured] | 1 | 50 | 50 | 29 | 0 | 0 | 1 | 16 | in use |
| 24 | VerificationCard | 78:639 | set | 6 | State:VARIANT[Valid/Expired/Wrong mess/Offline/Scanned/Already scanned] | 1 | 6 | 6 | 6 | 0 | 0 | 1 | 0 | in use |
| 25 | PassCard | 78:1645 | set | 10 | State:VARIANT[Available/Live 1/Live 2/Live 3/Expired/Not eligible/Wrong mess/Unavailable/Used/Already used] | 1 | 9 | 9 | 9 | 0 | 0 | 1 | 0 | in use |
| 26 | HoldToConfirm | 78:1686 | set | 4 | State:VARIANT[Idle/Holding/Sending/Failed] | 1 | 3 | 3 | 3 | 0 | 0 | 1 | 0 | in use |
| 27 | DateChip | 78:1710 | set | 4 | Weekday:TEXT; Day:TEXT; State:VARIANT[Default/Selected/Today/Disabled] | 1 | 91 | 91 | 63 | 0 | 0 | 15 | 140 | in use |
| 28 | MealSectionHeader | 78:1798 | set | 4 | Meal:TEXT; Time:TEXT; State:VARIANT[Upcoming/Serving now/Served/Not published] | 1 | 0 | 0 | 0 | 0 | 0 | 1 | 5 | nested only; nested in archived menu family only |
| 29 | DishRow | 78:1834 | set | 3 | Dish:TEXT; Show Chevron:BOOLEAN; Diet:VARIANT[Veg/Non-veg/Egg] | 1 | 4 | 4 | 4 | 0 | 0 | 1 | 0 | in use; near-duplicate of DishLine / ListRow |
| 30 | FeedbackTag | 81:718 | set | 3 | Label:TEXT; State:VARIANT[Default/Selected/Disabled] | 1 | 98 | 98 | 77 | 0 | 0 | 1 | 0 | in use |
| 31 | RatingChoice | 81:766 | set | 6 | Option:VARIANT[Didn't try it/Still bad/Better]; State:VARIANT[Default/Selected] | 1 | 3 | 3 | 3 | 0 | 0 | 1 | 0 | in use |
| 32 | TimelineStep | 81:872 | set | 3 | Title:TEXT; Meta:TEXT; Note:TEXT; Show Note:BOOLEAN; Show Line:BOOLEAN; Status:VARIANT[Done/Current/Upcoming] | 1 | 33 | 33 | 29 | 0 | 8 | 1 | 6 | in use |
| 33 | SupportButton | 81:973 | set | 4 | State:VARIANT[Support/Sending/Supported/Withdraw] | 1 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | nested only |
| 34 | CommentRow | 81:999 | set | 3 | Meta:TEXT; Body:TEXT; State:VARIANT[Visible/Hidden/Pending] | 1 | 33 | 33 | 33 | 0 | 0 | 1 | 0 | in use |
| 35 | WeekBars | 81:1082 | set | 2 | State:VARIANT[Measured/Empty] | 1 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | nested only |
| 36 | AmountField | 81:1167 | set | 4 | State:VARIANT[Empty/Focused/Filled/Error] | 1 | 6 | 6 | 6 | 0 | 0 | 1 | 0 | in use |
| 37 | Alert | 83:1304 | set | 2 | Title:TEXT; Message:TEXT; Confirm Label:TEXT; Kind:VARIANT[Default/Destructive] | 1 | 3 | 3 | 3 | 0 | 0 | 1 | 3 | in use |
| 38 | StepBar | 100:1045 | set | 12 | Step:VARIANT[Sent/Seen/Working on it/Fixed/Need more info/Reopened]; Surface:VARIANT[On light/On dark] | 1 | 62 | 62 | 48 | 0 | 10 | 14 | 3 | in use |
| 39 | MetaChip | 100:1079 | set | 6 | Label:TEXT; Show Icon:BOOLEAN; Icon:INSTANCE_SWAP; Surface:VARIANT[On light/On dark/Mono light/Mono dark/Tappable/Selected] | 1 | 153 | 153 | 127 | 3 | 176 | 22 | 67 | in use |
| 40 | CreditsChip | 100:1096 | set | 2 | Points:TEXT; State:VARIANT[Points/Soon] | 1 | 51 | 51 | 30 | 0 | 0 | 5 | 32 | in use |
| 41 | BentoTile | 100:1142 | set | 6 | Label:TEXT; Value:TEXT; Unit:TEXT; Meta:TEXT; Show Meta:BOOLEAN; Show Chevron:BOOLEAN; Show lock:BOOLEAN; Icon:INSTANCE_SWAP; Size:VARIANT[…] | 1 | 49 | 49 | 41 | 0 | 0 | 1 | 27 | in use |
| 42 | HomeHeader | 100:31984 | set | 2 | Title:TEXT; Line:TEXT; State:VARIANT[Points/Soon] | 1 | 51 | 51 | 30 | 0 | 0 | 1 | 16 | in use |
| 43 | CategoryRow | 101:1107 | set | 12 | Category:VARIANT[Found something/Smells or tastes off/Not clean/Ran out/Staff or service/Something else]; State:VARIANT[Default/Selected] | 1 | 18 | 18 | 18 | 0 | 0 | 1 | 0 | in use |
| 44 | ReportSummary | 101:1177 | set | 2 | Title:TEXT; Tone:VARIANT[Normal/Urgent] | 1 | 8 | 8 | 7 | 0 | 0 | 1 | 0 | in use |
| 45 | ReportTicket | 101:1285 | set | 2 | Code:TEXT; Category:TEXT; Title:TEXT; Show Category:BOOLEAN; Show Progress:BOOLEAN; Tone:VARIANT[Normal/Urgent] | 1 | 7 | 7 | 6 | 0 | 0 | 1 | 3 | in use |
| 46 | IssueCard | 101:1470 | set | 6 | Title:TEXT; Count:TEXT; Updated:TEXT; Show Icon:BOOLEAN; Step:VARIANT[Sent/Seen/Working on it/Fixed/Need more info/Reopened] | 1 | 33 | 33 | 21 | 0 | 10 | 0 | 0 | in use |
| 47 | IssueHero | 101:1588 | set | 3 | State:VARIANT[Support/Sending/Supported] | 1 | 18 | 18 | 18 | 0 | 0 | 1 | 0 | in use |
| 48 | DishLine | 102:1260 | set | 6 | Dish:TEXT; Surface:VARIANT[On dark/On light]; Diet:VARIANT[Veg/Non-veg/Egg] | 1 | 184 | 184 | 139 | 0 | 0 | 4 | 123 | in use |
| 49 | MealRow | 102:1283 | set | 2 | Meal:TEXT; Meta:TEXT; State:VARIANT[Upcoming/Served] | 1 | 13 | 13 | 13 | 0 | 0 | 1 | 30 | in use |
| 50 | NutritionBento | 102:1349 | set | 2 | State:VARIANT[Verified/Not provided] | 1 | 1 | 1 | 1 | 0 | 0 | 1 | 0 | in use |
| 51 | CrowdLegend | 102:1446 | set | 6 | Surface:VARIANT[On dark/On light]; Level:VARIANT[Quiet/Getting busy/Packed] | 1 | 2 | 2 | 2 | 0 | 2 | 1 | 0 | in use |
| 52 | FeelingChoice | 103:1356 | set | 6 | Option:VARIANT[Loved it/It was okay/Not good]; State:VARIANT[Default/Selected] | 1 | 10 | 10 | 7 | 0 | 0 | 1 | 0 | in use |
| 53 | RewardCard | 103:1408 | set | 4 | Name:TEXT; State:VARIANT[Available/Not enough/Redeemed/Coming soon] | 1 | 2 | 2 | 2 | 0 | 0 | 1 | 12 | in use; overlaps CouponCard / BigTicket |
| 54 | CategoryIcon | 131:42884 | set | 6 | Category:VARIANT[Found something/Smells or tastes off/Not clean/Ran out/Staff or service/Something else] | 1 | 66 | 66 | 52 | 0 | 10 | 26 | 3 | in use |
| 55 | OnboardingArt | 133:1398 | set | 10 | Angle:VARIANT[Welcome/Angle 1/Angle 2/Angle 3/Verify]; Size:VARIANT[Large/Small] | 1 | 16 | 16 | 16 | 3 | 3 | 7 | 3 | in use |
| 56 | OnboardingPage | 133:43145 | set | 5 | Title:TEXT; Line:TEXT; Show Line:BOOLEAN; Show Wordmark:BOOLEAN; Button:TEXT; Show Button:BOOLEAN; Link:TEXT; Show Link:BOOLEAN; Size:VARIANT[…] | 1 | 16 | 16 | 16 | 3 | 3 | 1 | 3 | in use |
| 57 | Logo | 140:1479 | set | 2 | Type:VARIANT[Mark/Lockup] | 1 | 95 | 95 | 74 | 4 | 49 | 28 | 23 | in use |
| 58 | LockScreen | 169:1567 | set | 5 | Time:TEXT; Date:TEXT; Layout:VARIANT[Single/Expanded/Stack/List/Saved] | 1 | 17 | 17 | 17 | 0 | 0 | 0 | 0 | in use |
| 59 | CommentComposer | 171:1796 | set | 5 | State:VARIANT[Empty/Typing/Near limit/Sending/Failed] | 1 | 9 | 9 | 9 | 0 | 0 | 0 | 0 | in use |
| 60 | KcalRing | 325:1653 | set | 3 | Goal:VARIANT[No goal/Under goal/Above goal] | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | unused; duplicate of KcalGauge |
| 61 | PortionSlider | 326:1724 | set | 10 | Value:VARIANT[0/0.5/1/1.5/2]; State:VARIANT[Idle/Dragging] | 1 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | nested only; duplicate of PortionControl |
| 62 | SpecialPassTile | 341:1600 | set | 4 | Label:TEXT; Detail:TEXT; State:VARIANT[Available/Redeeming/Used/Not today] | 1 | 77 | 77 | 48 | 0 | 0 | 0 | 6 | in use |
| 63 | KcalGauge | 349:1603 | set | 8 | Number:TEXT; Caption:TEXT; Fibre:TEXT; Show fibre:BOOLEAN; Value:VARIANT[Hidden/830/920/1070]; Goal:VARIANT[On/Off] | 1 | 10 | 10 | 10 | 0 | 0 | 0 | 0 | in use |
| 64 | MacroRing | 349:1640 | set | 8 | Grams:TEXT; Caption:TEXT; Macro:VARIANT[Protein/Carbs/Fat/Fibre]; Goal:VARIANT[On/Off] | 1 | 8 | 8 | 8 | 0 | 0 | 0 | 0 | in use |
| 65 | PortionControl | 349:1851 | set | 10 | Value:VARIANT[0/0.5/1/1.5/2]; State:VARIANT[Idle/Dragging] | 1 | 28 | 28 | 28 | 0 | 0 | 2 | 0 | in use |
| 66 | MacroBar | 349:1870 | set | 4 | Dish:VARIANT[Sambar/Rice/Paneer butter masala/Chapati] | 1 | 28 | 28 | 28 | 0 | 0 | 2 | 0 | in use |
| 67 | DatePill | 349:1928 | set | 4 | Day:TEXT; Date:TEXT; State:VARIANT[Default/Selected]; Logged:VARIANT[Yes/No] | 0 | 21 | 21 | 21 | 0 | 0 | 7 | 0 | in use |
| 68 | AppWordmark | 420:1689 | set | 2 | Size:VARIANT[Header/Large] | 1 | 53 | 53 | 32 | 1 | 46 | 7 | 20 | in use |
| 69 | TabSearchButton | 426:1681 | set | 2 | State:VARIANT[Default/Selected] | 1 | 210 | 210 | 158 | 0 | 173 | 14 | 91 | in use |
| 70 | SearchField | 428:1725 | set | 3 | Query:TEXT; State:VARIANT[Empty/Typing/Offline] | 1 | 4 | 4 | 4 | 0 | 5 | 0 | 0 | in use |
| 71 | SearchResultRow | 428:1760 | set | 4 | Title:TEXT; Meta:TEXT; Kcal:TEXT; Kind:VARIANT[Menu/Community/Help]; Diet:VARIANT[Veg/Non-veg/None] | 1 | 4 | 4 | 4 | 0 | 5 | 0 | 0 | in use |
| 72 | ScrollEdgeFade | 457:1097 | set | 3 | Style:VARIANT[Plain/Wash/Status] | 1 | 213 | 213 | 249 | 0 | 349 | 0 | 188 | in use |
| 73 | EstimatePill | 504:1730 | set | 2 | Surface:VARIANT[On dark/On light] | 1 | 11 | 11 | 11 | 0 | 27 | 6 | 5 | in use |
| 74 | DishPortionRow | 504:1837 | set | 2 | Kcal:TEXT; Macros:TEXT; Detail:VARIANT[Compact/Expanded] | 1 | 28 | 28 | 28 | 0 | 0 | 0 | 0 | in use |
| 75 | TodaysPlateCard | 611:40968 | set | 3 | Number:TEXT; Macros:TEXT; Size:VARIANT[Full/Compact]; State:VARIANT[Populated/Empty] | 1 | 0 | 0 | 2 | 0 | 0 | 0 | 0 | in use |
| 76 | SpendingSummaryCard | 611:40992 | set | 2 | Amount:TEXT; Size:VARIANT[Compact]; State:VARIANT[Populated/Empty] | 1 | 0 | 0 | 2 | 0 | 0 | 0 | 0 | in use |
| 77 | StaffTopBar | 1427:2333 | set | 2 | Mess:TEXT; Shift:TEXT; Type:VARIANT[Home/Task] | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 50 | archive only; superseded by NavHeader + StaffTabBar (G-run) |
| 78 | ResultCard | 744:84111 | set | 4 | Tag:TEXT; Title:TEXT; Fact:TEXT; State:VARIANT[Success/Offline/Hold/Stop] | 1 | 1 | 1 | 1 | 0 | 16 | 3 | 32 | in use |
| 79 | ListRow | 764:84422 | set | 4 | Name:TEXT; Reason:TEXT; Quantity:TEXT; Show reason:BOOLEAN; Show adjusted:BOOLEAN; Show chevron:BOOLEAN; Show safety:BOOLEAN; Show status:BOOLEAN; … | 1 | 78 | 78 | 75 | 0 | 151 | 2 | 128 | in use |
| 80 | AdminTabBar | 808:86775 | set | 4 | Selected:VARIANT[Today/Issues/Insights/Manage] | 1 | 0 | 0 | 0 | 0 | 173 | 0 | 39 | in use |
| 81 | StatusPill | 808:86801 | set | 6 | Label:TEXT; State:VARIANT[Success/Hold/Stop/Offline/Sent/Lapsed] | 1 | 102 | 102 | 90 | 0 | 392 | 13 | 206 | in use |
| 82 | MessBadge | 814:87225 | set | 4 | Name:TEXT; Percent:TEXT; State:VARIANT[Success/Hold/Stop/Offline] | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | unused; superseded by CrowdBadge / StatusPill |
| 83 | MetricBadge | 881:1850 | set | 2 | Name:TEXT; Value:TEXT; State:VARIANT[Value/No data] | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | unused; superseded by BentoTile / HeroNumber |
| 84 | WasteBar | 881:1872 | set | 2 | Never served:TEXT; Left on plates:TEXT; Donated:TEXT; State:VARIANT[Measured/Empty] | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | unused; superseded by ChartBar (Never served / Left on plates / Donated) |
| 85 | ChartBar | 887:1840 | set | 10 | Kind:VARIANT[Expected/On target/Off target/Gap/Never served/Left on plates/Donated/Pill/Pill lime/Pill ghost] | 1 | 44 | 44 | 24 | 0 | 145 | 0 | 71 | in use |
| 86 | CouponCard | 993:1881 | set | 2 | Name:TEXT; Fact:TEXT; Points:TEXT; State:VARIANT[Live/Awaiting] | 1 | 18 | 18 | 12 | 0 | 22 | 0 | 0 | in use |
| 87 | DemandRingCard | 995:1946 | set | 2 | Eyebrow:TEXT; Number:TEXT; Unit:TEXT; Line:TEXT; Size:VARIANT[Default/Large] | 1 | 0 | 0 | 0 | 0 | 8 | 0 | 2 | in use |
| 88 | PrepCard | 995:1957 | set | 2 | Name:TEXT; Quantity:TEXT; Fact:TEXT; Unit:TEXT; Size:VARIANT[Default/Hero] | 1 | 0 | 0 | 0 | 0 | 10 | 0 | 49 | in use |
| 89 | AuditRow | 1028:1887 | set | 3 | Time:TEXT; Title:TEXT; Show pill:BOOLEAN; Show line:BOOLEAN; Show time:BOOLEAN; Show break:BOOLEAN; Detail:TEXT; Show detail:BOOLEAN; State:VARIANT[…] | 1 | 0 | 0 | 0 | 0 | 199 | 0 | 29 | in use |
| 90 | QuestionCard | 1220:1912 | set | 3 | State:VARIANT[Ask/All clear/Offline] | 1 | 0 | 0 | 0 | 0 | 4 | 0 | 0 | in use |
| 91 | TimeRail | 1220:1937 | set | 2 | State:VARIANT[Live/Saved] | 1 | 0 | 0 | 0 | 0 | 4 | 0 | 0 | in use |
| 92 | DecisionActions | 1290:2031 | set | 16 | State:VARIANT[Lapsed/Open/Declining/Read-only/Offline/Lapsed · Offline/Sending/Saved/Failed/Approving/Approved/Approve failed/Decline ready/…] | 1 | 0 | 0 | 0 | 0 | 16 | 0 | 11 | in use |
| 93 | HeroActions | 1311:1990 | set | 6 | State:VARIANT[Default/Sending/Notified/Failed/Confirmed/Offline] | 1 | 0 | 0 | 0 | 0 | 14 | 0 | 0 | in use |
| 94 | MenuDishTile | 1468:119999 | set | 4 | Kind:VARIANT[Dish/Ticket/Add]; Diet:VARIANT[Veg/Egg/Non-veg] | 0 | 0 | 0 | 0 | 0 | 23 | 0 | 0 | in use |
| 95 | PlateRingHero | 1469:2051 | set | 3 | Meal:VARIANT[Breakfast/Lunch/Dinner] | 0 | 0 | 0 | 0 | 0 | 4 | 0 | 0 | in use |
| 96 | StaffTabBar | 1507:120513 | set | 3 | Selected:VARIANT[Home/Alerts/Me] | 1 | 0 | 0 | 0 | 11 | 0 | 0 | 0 | in use |
| 97 | BigTicket | 1527:125830 | set | 3 | Heading:TEXT; Code:TEXT; Colour:TEXT; Timer:TEXT; Holder:TEXT; Item:TEXT; Chip:TEXT; State:VARIANT[Live/Used/Not today] | 1 | 8 | 8 | 8 | 0 | 0 | 0 | 0 | in use |
| 98 | StatusBar | 74:2 | comp | — | Time:TEXT | 1 | 283 | 283 | 230 | 77 | 176 | 7 | 153 | in use |
| 99 | HomeIndicator | 74:21 | comp | — | — | 1 | 283 | 283 | 230 | 77 | 176 | 7 | 153 | in use |
| 100 | OfflineBanner | 75:187 | comp | — | Message:TEXT | 1 | 15 | 15 | 9 | 0 | 36 | 1 | 23 | in use |
| 101 | InlineError | 75:200 | comp | — | Message:TEXT; Action:TEXT; Show Action:BOOLEAN | 1 | 13 | 13 | 12 | 0 | 0 | 1 | 0 | in use |
| 102 | OpenDecisionNote | 75:246 | comp | — | Text:TEXT | 1 | 67 | 3 | 0 | 0 | 0 | 1 | 0 | in use |
| 103 | SampleNote | 75:257 | comp | — | — | 1 | 165 | 36 | 18 | 77 | 173 | 1 | 84 | in use |
| 104 | EmptyState | 75:270 | comp | — | Title:TEXT; Body:TEXT; Show Action:BOOLEAN; Icon:INSTANCE_SWAP | 1 | 16 | 16 | 16 | 0 | 19 | 1 | 4 | in use |
| 105 | MetricHero | 77:735 | comp | — | Label:TEXT; Number:TEXT; Unit:TEXT | 1 | 27 | 27 | 17 | 0 | 0 | 1 | 0 | in use |
| 106 | DateStrip | 78:1719 | comp | — | — | 1 | 13 | 13 | 9 | 0 | 0 | 1 | 20 | in use |
| 107 | ExpenseRow | 81:1121 | comp | — | Category:TEXT; Meta:TEXT; Amount:TEXT | 1 | 36 | 36 | 18 | 0 | 0 | 1 | 0 | in use |
| 108 | IDFallback | 83:975 | comp | — | — | 1 | 6 | 6 | 6 | 0 | 0 | 1 | 0 | in use |
| 109 | PrivacyBanner | 83:988 | comp | — | Text:TEXT | 1 | 16 | 16 | 12 | 0 | 0 | 1 | 0 | in use |
| 110 | SafetyBanner | 83:1026 | comp | — | — | 1 | 5 | 5 | 3 | 0 | 0 | 1 | 0 | in use |
| 111 | InfoRow | 83:1052 | comp | — | Label:TEXT; Value:TEXT | 1 | 3 | 3 | 3 | 0 | 0 | 1 | 0 | in use |
| 112 | LockNotification | 83:1352 | comp | — | Title:TEXT; Body:TEXT; Time:TEXT | 1 | 13 | 13 | 13 | 0 | 0 | 8 | 0 | in use |
| 113 | ListSeparator | 83:1377 | comp | — | — | 1 | 149 | 149 | 119 | 0 | 0 | 1 | 27 | in use |
| 114 | HeroNumber | 100:1157 | comp | — | Eyebrow:TEXT; Number:TEXT; Unit:TEXT; Line:TEXT; Show Line:BOOLEAN | 1 | 3 | 3 | 3 | 0 | 0 | 1 | 6 | in use |
| 115 | UpdateCard | 101:1612 | comp | — | Text:TEXT; Owner:TEXT | 1 | 18 | 18 | 18 | 0 | 0 | 1 | 0 | in use |
| 116 | CommentsRow | 101:1623 | comp | — | Count:TEXT; Preview:TEXT | 1 | 12 | 12 | 12 | 0 | 0 | 1 | 0 | in use |
| 117 | SlotChart | 102:1462 | comp | — | Line:TEXT; Show Line:BOOLEAN | 1 | 3 | 3 | 3 | 0 | 0 | 1 | 0 | in use |
| 118 | IdentityCard | 103:1423 | comp | — | Name:TEXT; Roll:TEXT; Initials:TEXT | 1 | 9 | 9 | 7 | 1 | 1 | 1 | 1 | in use |
| 119 | PointsRow | 103:1483 | comp | — | Label:TEXT; Points:TEXT | 1 | 5 | 5 | 5 | 0 | 0 | 1 | 18 | in use |
| 120 | LockActions | 103:1494 | comp | — | Action 1:TEXT; Action 2:TEXT; Action 3:TEXT; Show Action 3:BOOLEAN | 1 | 4 | 4 | 4 | 0 | 0 | 2 | 0 | in use |
| 121 | MealWash | 152:1399 | comp | — | — | 1 | 249 | 249 | 108 | 0 | 0 | 0 | 56 | in use |
| 122 | ContextMenu | 171:1656 | comp | — | Label:TEXT | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 0 | in use |
| 123 | Keyboard | 171:1694 | comp | — | — | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 0 | in use |
| 124 | PlateDishRow | 326:1725 | comp | — | Kcal:TEXT | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | unused; duplicate of DishPortionRow |
| 125 | DatePillStrip | 349:1929 | comp | — | — | 1 | 3 | 3 | 3 | 0 | 0 | 0 | 0 | in use |
| 126 | HeaderBackdrop | 489:1720 | comp | — | — | 1 | 5 | 5 | 59 | 0 | 62 | 0 | 16 | in use |
| 127 | NutrientsCard | 561:27699 | comp | — | Fibre:TEXT; Sugar:TEXT; Sodium:TEXT | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 0 | in use |
| 128 | ShiftCounter | 732:13 | comp | — | Count:TEXT; Label:TEXT; Sub:TEXT; Show delta:BOOLEAN | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 16 | archive only; superseded by staff home cards (G-run) |
| 129 | Viewfinder | 732:20 | comp | — | Hint:TEXT | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 4 | archive only; superseded by detached "Viewfinder" frame on 09 |
| 130 | KitchenSeesBlock | 764:84423 | comp | — | Eyebrow:TEXT; Show second row:BOOLEAN | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 5 | archive only; superseded by PrepCard |
| 131 | LiveDial | 820:87165 | comp | — | Eyebrow:TEXT; Number:TEXT; Unit:TEXT; Max:TEXT; Line:TEXT | 1 | 0 | 0 | 0 | 0 | 3 | 0 | 4 | in use |
| 132 | CrowdBadge | 822:87167 | comp | — | Name:TEXT; Level:TEXT; Updated:TEXT | 1 | 0 | 0 | 0 | 0 | 4 | 0 | 8 | in use |
| 133 | ScopeSheet | 967:1838 | comp | — | Show meal:BOOLEAN; Show all messes:BOOLEAN | 1 | 0 | 0 | 0 | 0 | 4 | 0 | 1 | in use |
| 134 | RulesSheet | 967:1862 | comp | — | Rule 1:TEXT; Icon 1:INSTANCE_SWAP; Rule 2:TEXT; Icon 2:INSTANCE_SWAP; Rule 3:TEXT; Icon 3:INSTANCE_SWAP; Show rule 3:BOOLEAN | 1 | 0 | 0 | 0 | 0 | 5 | 0 | 0 | in use |
| 135 | NeedsYouCard | 993:1882 | comp | — | Number:TEXT; Label:TEXT; Chip 1:TEXT; Icon 1:INSTANCE_SWAP; Chip 2:TEXT; Icon 2:INSTANCE_SWAP; Chip 3:TEXT; Icon 3:INSTANCE_SWAP | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | archive only; superseded by Today · Now hero (F1) |

## (a) Zero instances

| Component | Id | Instances | Proposed action (A5) |
|---|---|---|---|
| KcalRing | 325:1653 | 0 anywhere | Deprecate → use KcalGauge |
| MessBadge | 814:87225 | 0 anywhere | Deprecate → use CrowdBadge / StatusPill |
| MetricBadge | 881:1850 | 0 anywhere | Deprecate → use BentoTile |
| WasteBar | 881:1872 | 0 anywhere | Deprecate → use ChartBar |
| PlateDishRow | 326:1725 | 0 anywhere | Deprecate → use DishPortionRow |

**Zero live instances, used only on page 03** (spec boards or inside other component specs): ScrollEdge 74:288, MealSectionHeader 78:1798 (also 5 in 99), SupportButton 81:973, WeekBars 81:1082, PortionSlider 326:1724. These have instances, so A5 lists them rather than moving them.

**Archive-only** (0 live, instances in 99 only): StaffTopBar 1427:2333 (50), ShiftCounter 732:13 (16), Viewfinder 732:20 (4), KitchenSeesBlock 764:84423 (5), NeedsYouCard 993:1882 (1). These have instances, so they stay; A5 lists them.

**No description:** DatePill 349:1928, StaffTopBar 1427:2333, MenuDishTile 1468:119999, PlateRingHero 1469:2051 (A4 fills them).

## (b) Near-duplicates

| Pair | Live counts | Finding |
|---|---|---|
| DishRow 78:1834 vs DishLine 102:1260 / ListRow 764:84422 | 12 vs 507 / 382 | DishRow is the older dish row (4 per student page: 3 on Feedback · Pick dish, 1 on Search · Menu result, 63 pt tall). Same job as DishLine On light. Swapping is VISIBLE (row height and layout differ), so it goes to the B9 list. |
| PortionSlider 326:1724 vs PortionControl 349:1851 | 0 vs 84 | Same variants (Value 0–2, Idle/Dragging). PortionSlider is a page-03-only duplicate. |
| PlateDishRow 326:1725 vs DishPortionRow 504:1837 | 0 vs 84 | PlateDishRow is the older row with a single Kcal property. |
| KcalRing 325:1653 vs KcalGauge 349:1603 | 0 vs 30 | KcalGauge replaced it in run 4B. |
| AtMessTile 77:340 Pass variants vs SpecialPassTile 341:1600 | 198 vs 202 | Every live AtMessTile is Type=Attendance (76 on 04). The three Pass variants (Available / Redeemed / Now) have 0 live instances and duplicate SpecialPassTile. Variants can't be moved out of a set without breaking it, so A5 lists them as deprecated variants. |
| ScrollEdge 74:288 vs ScrollEdgeFade 457:1097 | 0 vs 1,024 | ScrollEdgeFade Style=Wash is the wash fade; ScrollEdge Light/Dark is the older pair. No paint or effect style named wash or fade exists; the wash itself is the MealWash component (606 live) used as a frame fill layer. |
| StatusTag 75:177 vs StatusPill 808:86801 | 3 vs 686 | StatusTag has 19 status values, several outside the A6 vocabulary. 1 live instance per student page. |
| RewardCard 103:1408 vs CouponCard 993:1881 / BigTicket 1527:125830 | 6 vs 70 / 24 | RewardCard is the Credits-catalogue card; it overlaps CouponCard but is not a straight swap. |
| Titled-back variants (NavHeader / GlassButton) | — | None left: G1 removed them. NavHeader Back is the single GlassButton Kind=Icon (chevron.left). |
| MessBadge / MetricBadge / WasteBar vs CrowdBadge / BentoTile / ChartBar | 0 vs 4 / 139 / 257 | Early admin parts replaced in the R2 and F runs. |

## (c) Detached look-alikes (loose layers that should be instances)

Counted by layer name and shape on phone frames (frames named "… hit area" excluded). A node counts when it is a FRAME or GROUP, not inside an instance, and its name matches the component family.

| Page | Card | Row | Tile | Chip | Pill | Named after a component | Total |
|---|---|---|---|---|---|---|---|
| 04 | 0 | 8 | 0 | 0 | 11 | 0 | 19 |
| 05 | 0 | 8 | 0 | 0 | 11 | 0 | 19 |
| 07 | 0 | 5 | 0 | 0 | 7 | 0 | 12 |
| 09 | 0 | 96 | 37 | 2 | 56 | 1 ("Viewfinder") | 192 |
| 10 | 24 | 102 | 34 | 0 | 0 | 1 ("Symbol") | 161 |

Notes:
- Staff (09) and Admin (10) were built in the G and F runs from loose rows, tiles and pills on purpose (large staff type, bespoke admin cards). Swapping them for instances is a VISIBLE change and goes to the B9 list, not to C1.
- Student (04/05): the 8 rows are "Row · Wednesday special" on the 8 Meals menu frames (Menu, Menu changed, Offline, their 3 full-scroll copies, Dinner, Breakfast), a loose copy of the MenuDishTile Ticket look. The 11 pills are "Pill · Get" / "Pill · 80 more" on the Credits offer frames (Rewards, Offer · Sending / Failed, Rewards · Offline and the full-scroll copies), loose copies of ChartBar Pill / Pill lime. 07 has the subset of those frames it carries (5 rows, 7 pills).
- Layout wrappers named "Title row", "Bento row" and "Number row" are auto-layout groups, not look-alikes, and are not counted.
- The two frames named after a component (09 "Viewfinder", 10 "Symbol") are hand-built copies; the Symbol one is a drawn icon with no matching Symbol variant.

