const dishesDefault = [
	{
		id: 1,
		name: 'Ciasto jogurtowe'.toUpperCase(),
		kind: 'ciasta',
		img: '/img/jogurtowe.jpg',
		ingredients: 'Jogurt naturalny: 200 g Jajko: 4',
		recipe:
			'Całe jajka zmiksować z cukrem do uzyskania jasnej, puszystej masy. Dodać jogurt i miksować na mniejszych obrotach, a następnie dodać mąkę oraz proszek do pieczenia i mieszać do uzyskania jednolitej konsystencji. Ciasto przełożyć do formy o wymiarach 22x9, a na wierzch wyłożyć owoce. Piec około 40 minut w 180 stopniach.'
	},
	{
		id: 2,
		name: 'Rosyjskie placuszki z twarogu'.toUpperCase(),
		kind: 'naleśniki',
		img: '/img/rosyjskie_placuszki.jpg',
		ingredients: 'Twaróg klinek: 500 g Jajko: 2',
		recipe:
			'Zmielić twaróg z jajkami za pomocą blendera, a następnie wymieszać razem wszystkie składniki do uzyskania jednolitej masy. Ciasto formować w kulki delikatnie zwilżonymi dłoniami. Wyłożyć na papier do pieczenia i piec około 30 minut w temperaturze 180 stopni.'
	},
	{
		id: 3,
		name: 'Kasza bulgur z warzywami'.toUpperCase(),
		kind: 'kasza',
		img: '/img/kasza_bulgur.jpg',
		ingredients: 'Sucha kasza bulgur: 200 g Papryka: 1',
		recipe:
			'Kaszę bulgur ugotować w lekko osolonej wodzie - okolo 15 minut, aż będzie miękka. Pokroić cebule w piórka, paprykę w słupki, a cukinie w kostkę. W wersji z mięsem początkowo przyprawiamy mięso ziołami, solą i pieprzem. Podsmażamy na łyżce oleju, to ścięcia się mięsa i przekładamy do miski. Zeszklić na patelni cebule, następnie dodać do niej paprykę. Do delikatnie podsmażonej cebuli z papryka dokładamy cukinie, chwile podsmażamy i następnie dusimy przez około 5 minut, do czasu, aż warzywa staną się miękkie. Następnie wrzucamy pomidory pokrojone w kostkę, oraz ciecierzycę. Warzywa chwile poddusić, a następnie wrzucić do nich ugotowana kasze. Doprawić do smaku i chwile podsmażyć wszystko razem.'
	},
	{
		id: 4,
		name: 'Naleśniki, około 9 sztuk'.toUpperCase(),
		kind: 'naleśniki',
		img: '/img/nalesniki.jpg',
		ingredients: 'Jajko: 2 Mleko: 150 ml',
		recipe: 'Dupa blada'
	},
	{
		id: 5,
		name: 'Sałatka z pieczonych batatów i ciecierzycy'.toUpperCase(),
		kind: 'sałatka',
		img: '/img/salatka_bataty.jpg',
		ingredients: 'Bataty: 500 g Oliwia: 2 łyżki',
		recipe:
			'Piekarnik nagrzać do 200 stopni C (z termoobiegiem jeśli jest taka możliwość).Bataty obrać i pokroić w kosteczkę. Włożyć do miski, dodać przyprawy oraz 1 łyżkę oliwę i wszystko wymieszać.Rozłożyć na dużej blaszce do pieczenia lub większym naczyniu żaroodpornym i wstawić do piekarnika. Piec przez 10 minut. Dodać odcedzoną ciecierzycę, polać ją dodatkową łyżką oliwy, doprawić solą i pieprzem i wymieszać z batatami. Piec jeszcze przez ok. 10 minut (lub aż bataty będą miękkie i zaczną się rumienić). Upieczone warzywa wyłożyć do półmisków, dodać rukolę oraz pokrojone pomidorki koktajlowe. Doprawić je solą i pieprzem. Wymieszać składniki sosu z dodatkiem pieprzu i odrobiny soli i polać po sałatce. Przed jedzeniem wymieszać.'
	},
	{
		id: 6,
		name: 'Testowe, około 9 sztuk'.toUpperCase(),
		kind: 'naleśniki',
		img: '/img/nalesniki.jpg',
		recipe: 'dupa blada',
		ingredients: 'Pomidorki koktajlowe: 10g Cukier: 20g Jajko: 1'
	}
];

export default dishesDefault;
