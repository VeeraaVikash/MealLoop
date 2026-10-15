"""Student redesign P4: compute the Meals tiers for the 28 slots from the transcribed board.
Writes design/audit/redesign/menu_tiers.json (used by the Figma generator) and prints a review table."""
import json, re
H, NV, G, Q = 'H', 'NV', 'G', 'Q'
# Board items, split: "or" and "/" items are separate dishes (owner rule). Flags: H highlight, NV non-veg, G ** gravy, Q hard to read.
M = {
 'Mon': {
  'Breakfast': [('Millet Dosa',H),'Bread','Butter','Jam','Idly Podi','Oil','Chutney','Sambar','Chapathi','White Khuruma','Tea','Coffee','Milk',('Boiled Egg',NV)],
  'Lunch': [('Chappathi',H),('Rajma Masala',H),'Jeera Pulao','Steamed Rice','Arachivitta Sambar','Panchratna Dal',('Drumstick Brinjal',H,Q),('Veg Subji',H),'Pineapple Rasam','Pickle','Butter Milk','Fryums'],
  'Snacks': [('Pav Bajji',H),'Tea','Coffee'],
  'Dinner': [('Madras Paratha',H),('Mattar Paneer Masala',H),'Vegetable Idly','Idly Podi','Oil','Special Chutney','Steamed Rice','Hara Moong Dal','Sambar','Rasam','Pickle','Fryums','Veg Salad','Milk','Banana',('Fish Gravy',H,NV,G)]},
 'Tue': {
  'Breakfast': ['Bread','Butter','Jam',('Poori',H),('Dal Allo Masala',H),'Semia Veg Kichadi','Chutney','Tea','Coffee','Milk'],
  'Lunch': ['Sweet',('Millet Chappathi',H),'Meal Maker Curry',('Bahara Pulao',H),'Variety Rice','Curd Rice','Steamed Rice','Dal Fry','Tomato Rasam',('Urulai Peas Rosted',H),'Pickle','Butter Milk'],
  'Snacks': [('Mysore Bonda',H),'Chutney','Tea','Coffee'],
  'Dinner': [('Methi Chappathi',H),('Black Chenna',H),'Steamed Rice','Dal Fry',('Veg Gobi Dry',H),('Chilly Gobi Dry',H),('Millet Dosa',H),'Idly','Podi','Oil','Sambar','Pepper Rasam','Pickle','Fryums','Veg Salad','Milk','Special Fruits',('Mutton Gravy',H,NV,G)]},
 'Wed': {
  'Breakfast': [('Millet Idli',H),'Bread','Butter','Jam','Idly Podi','Oil','Sambar','Chutney',('Pongal',Q),'Mint Chutney','Tea','Coffee','Milk',('Masala Omelet',NV)],
  'Lunch': ['Chappati','Muttar Masala',('Bhindi Aloo Bujjiya',H),'Veg Pulao','Steamed Rice','Masala Sambar','Tomato Dal','Garlic Rasam','Pickle','Poriyal','Butter Milk','Fryums'],
  'Snacks': [('Veg Puff',H),('Sweet Puff',H),'Tea','Coffee'],
  'Dinner': ['Chappathi','Steamed Rice','Dal Tadka',('Butter Chicken Masala',NV),'Panneer Butter Masala','Rasam','Pickle','Fryums','Veg Salad','Milk','Banana',('Chicken Gravy',H,NV,G)]},
 'Thu': {
  'Breakfast': ['Bread','Butter','Jam','Lemon Idiyappam','Masala Idiyappam','Millet Idiyappam','Chappathi','Channa Masala','White Khurma','Chutney','Tea','Coffee','Milk'],
  'Lunch': [('Chappathi',H),('Aloo Gobi Athiraki',H,Q),('Onion Pulao',H),'Steamed Rice',('Punjabi Dal Fry',H),'Kadi Pakoda','Rasam','Pickle','Yam Varuval','Butter Milk','Fryums'],
  'Snacks': [('Pani Poori',H),('Chenna Sundal',H),'Tea','Coffee'],
  'Dinner': [('Millet Sweet',H),('Kasari',H),('Chole Pattora',H,Q),('Chole Masala',H),'Steamed Rice',('Tomato Dal',H),'Idly','Sambar','Coconut Chutney','Idly Podi','Oil','Rasam','Pickle','Fryums','Veg Salad','Milk','Banana',('Mutton Gravy',H,NV,G)]},
 'Fri': {
  'Breakfast': ['Bread','Butter','Jam','Chappathi','Rajma Masala','Dosa','Idly','Podi','Oil','Sambar','Coconut Chutney','Tomato Chutney','Tea','Coffee','Milk'],
  'Lunch': ['Dry Jamun','Bread Halwa',('Capscum Gobi Curry',H),'Dal Tadka',('Veg Briyani',H),'Mix Raihta','Bisibelabath Rice','Curd Rice','Steamed Rice','Tomato Rasam','Pickle','Butter Milk','Fryums'],
  'Snacks': [('Sambar Vada',H),('Millet Vada',H),'Tea','Coffee'],
  'Dinner': [('Ghee Chappathi',H),('Aloo Mutter Masala',H),'Vegetable Dal',('Millet Rava Upma',H),'Coconut Chutney','Steamed Rice','Rasam','Pickle','Fryums','Veg Salad','Milk','Special Fruits',('Chicken Gravy',H,NV,G)]},
 'Sat': {
  'Breakfast': ['Bread','Butter','Jam',('Chappathi',H),('Veg Khruma',H),'Sambar','Pongal',('Millet Pongal Vada',H),'Chutney','Tea','Coffee','Milk'],
  'Lunch': [('Poori',H),'White Peas Curry',('AloThindeli',H,Q),('Khismiri Pulao',H),'Steamed Rice','Dal Fry',('KaraKozhambu',H),'Kootu (Cabbage)','Rasam','Pickle','Butter Milk','Fryums'],
  'Snacks': [('Cake',H),('Browni',H),'Tea','Coffee'],
  'Dinner': ['Panjabi Paratha','Potato Fry','Steamed Rice',('Veg Jhal Pyaza',H),('Bagara Dal',H),'Idly','Idly Podi','Oil','Chutney',('Kathamba Sambar',H),'Rasam','Pickle','Fryums','Veg Salad','Milk','Banana',('Chicken Gravy',H,NV,G)]},
 'Sun': {
  'Breakfast': ['Bread','Butter','Jam',('Chole Bhature',H),'Chenna Masala',('Samba Rava Upma',H),'Coconut Chutney','Tea','Coffee','Milk'],
  'Lunch': ['Chapathi',('Pepper Chicken',H,NV),('Kadai Chicken',H,NV),('Panneer Butter Masala',H),'Dal Dhadka','Mint Pulao','Steamed Rice','Rasam','Pickle',('Mixed Veg Poriyal',H),'Butter Milk','Fryums',('Chicken Gravy',NV,G)],
  'Snacks': [('Corn Bajji',H),('Bajji with Chutney',H),'Tea','Coffee'],
  'Dinner': ['Aloo Paratha','Masala Curd','Steamed Rice','Hara Moong Dal Tadka',('Kathamba Sambar',H),('Poriyal',H),'Rasam','Pickle','Fryums','Veg Salad','Milk','Banana','Cone Ice Cream',('Chicken Gravy',H,NV,G)]},
}
BREAD = re.compile(r'dosa|idli|idly|chap+at+h?i|paratha|poori|bhature|idiyappam', re.I)
RICE = re.compile(r'pulao|briyani|biryani|rice|bath|pongal(?! vada)|kichadi|upma', re.I)
CURRY = re.compile(r'masala|curry|khurma|khuruma|khruma|subji|chenna|chole|channa|rajma|kadai|pepper chicken|kozhambu|jhal|pakoda|gobi|bujjiya|pan+eer|peas|thindeli|athiraki|brinjal|allo|aloo', re.I)
NOTCURRY = re.compile(r'sambar|rasam|dal|dhal|curd|omelet|chutney|podi|poriyal|kootu|varuval|potato fry|egg|sundal', re.I)
DAL = re.compile(r'\bdal\b|dhal|dhadka|tadka', re.I)
STAPLE = {'Bread','Butter','Jam','Tea','Coffee','Milk','Oil','Pickle','Fryums'}
def norm(it):
    if isinstance(it, str): return {'n': it, 'h': False, 'nv': False, 'g': False, 'q': False}
    n, *f = it; return {'n': n, 'h': H in f, 'nv': NV in f, 'g': G in f, 'q': Q in f}
def kind(d):
    n = d['n']
    if n in STAPLE or re.search(r'podi|chutney|\boil\b', n, re.I): return 'side'
    if BREAD.search(n): return 'bread'
    if CURRY.search(n) and not NOTCURRY.search(n): return 'curry'
    if RICE.search(n): return 'rice'
    if DAL.search(n): return 'dal'
    return 'side'
def tiers(day, slot, items):
    ds = [norm(x) for x in items]
    for d in ds: d['k'] = kind(d)
    used = set()
    hl = next((d for d in ds if d['h'] and not d['g']), None)
    if hl: used.add(hl['n'])
    gravies = [d for d in ds if d['g']]; used |= {d['n'] for d in gravies}
    curries = [d for d in ds if d['k'] == 'curry' and d['n'] not in used]
    row = []
    if (slot == 'Dinner' and curries) or len(curries) >= 2: row = curries[:2]
    used |= {d['n'] for d in row}
    mains = []
    def take(pred, limit=3):
        for d in ds:
            if len(mains) >= limit: return
            if d['n'] in used or d['n'] in STAPLE or d['g']: continue
            if pred(d): mains.append(d); used.add(d['n'])
    take(lambda d: d['h'])
    take(lambda d: d['k'] == 'bread')
    if not any(m['k'] == 'rice' for m in mains):
        before = len(mains); take(lambda d: d['k'] == 'rice' and 'steamed' not in d['n'].lower(), min(3, len(mains) + 1))
        if len(mains) == before: take(lambda d: d['k'] == 'rice', min(3, len(mains) + 1))
    take(lambda d: d['k'] == 'curry')
    take(lambda d: d['k'] == 'dal')
    nvrows = [d for d in ds if d['nv'] and not d['g'] and d['n'] not in used]
    used |= {d['n'] for d in nvrows}
    comes = [d for d in ds if d['n'] not in used]
    pub = lambda d: {'n': d['n'], 'nv': d['nv'], 'h': d['h'], 'q': d['q']}
    return {'day': day, 'slot': slot, 'highlight': pub(hl) if hl else None, 'mains': [pub(d) for d in mains], 'curries': [pub(d) for d in row],
            'nvrows': [pub(d) for d in gravies + nvrows], 'comes': [d['n'] for d in comes], 'count': len(ds), 'veg': sum(1 for d in ds if not d['nv']), 'nonveg': sum(1 for d in ds if d['nv']),
            'check': [d['n'] for d in ds if d['q']]}
out = []
for day, slots in M.items():
    for slot, items in slots.items():
        out.append(tiers(day, slot, items))
json.dump(out, open('/home/user/MealLoop/design/audit/redesign/menu_tiers.json', 'w'), indent=1, ensure_ascii=False)
for t in out:
    print(f"{t['day']} {t['slot']:9} HL={t['highlight']['n'] if t['highlight'] else '-':22} MAINS={[m['n'] for m in t['mains']]} CUR={[c['n'] for c in t['curries']]} NV={[g['n'] for g in t['nvrows']]}\n      COMES={' · '.join(t['comes'])}")
