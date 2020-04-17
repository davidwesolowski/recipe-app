const dishesDefault = [
	{
		id: 1,
		name: 'Ciasto jogurtowe'.toUpperCase(),
		kind: 'ciasta',
		img: '/img/jogurtowe.jpg',
		ingriedients: [
			{
				type: 'Jogurt naturalny',
				amount: '200 g'
			},
			{
				type: 'Jajko',
				amount: 4
			},
			{
				type: 'Mąka kukurydziana',
				amount: '150 g'
			},
			{
				type: 'Cukier',
				amount: '60 g'
			},
			{
				type: 'Proszek do pieczenia',
				amount: '1 łyżeczka'
			},
			{
				type: 'Owoce (maliny, borówki, wiśnie)',
				amount: '200 g'
			}
		],
		recipe:
			'Całe jajka zmiksować z cukrem do uzyskania jasnej, puszystej masy. Dodać jogurt i miksować na mniejszych obrotach, a następnie dodać mąkę oraz proszek do pieczenia i mieszać do uzyskania jednolitej konsystencji. Ciasto przełożyć do formy o wymiarach 22x9, a na wierzch wyłożyć owoce. Piec około 40 minut w 180 stopniach.'
	},
	{
		id: 2,
		name: 'Rosyjskie placuszki z twarogu'.toUpperCase(),
		kind: 'naleśniki',
		img: '/img/rosyjskie_placuszki.jpg',
		ingriedients: [
			{
				type: 'Twaróg klinek',
				amount: '500 g'
			},
			{
				type: 'Jajko',
				amount: 2
			},
			{
				type: 'Mąka ryżowa',
				amount: '100 g'
			},
			{
				type: 'Cukier',
				amount: '40 g'
			},
			{
				type: 'Aromat waniliowy',
				amount: 0
			}
		],
		recipe:
			'Zmielić twaróg z jajkami za pomocą blendera, a następnie wymieszać razem wszystkie składniki do uzyskania jednolitej masy. Ciasto formować w kulki delikatnie zwilżonymi dłoniami. Wyłożyć na papier do pieczenia i piec około 30 minut w temperaturze 180 stopni.'
	},
	{
		id: 3,
		name: 'Kasza bulgur z warzywami'.toUpperCase(),
		kind: 'kasza',
		img: '/img/kasza_bulgur.jpg',
		ingriedients: [
			{
				type: 'Sucha kasza bulgur',
				amount: '200 g'
			},
			{
				type: 'Papryka',
				amount: 1
			},
			{
				type: 'Cebula',
				amount: 1
			},
			{
				type: 'Średnia cukinia',
				amount: 1
			},
			{
				type: 'Puszka pomidorów',
				amount: 1
			},
			{
				type: 'Ząbek czosnku',
				amount: 2
			},
			{
				type: 'Słoik ciecierzycy w zalewie',
				amount: 'pół słoika'
			},
			{
				type:
					'przyprawy: tymianek, kolendra, bazylia, słodka papryka, sól, pieprz',
				amount: 'do smaku'
			},
			{
				type: 'Pierś z kurczaka',
				amount: 1
			}
		],
		recipe:
			'Kaszę bulgur ugotować w lekko osolonej wodzie - okolo 15 minut, aż będzie miękka. Pokroić cebule w piórka, paprykę w słupki, a cukinie w kostkę. W wersji z mięsem początkowo przyprawiamy mięso ziołami, solą i pieprzem. Podsmażamy na łyżce oleju, to ścięcia się mięsa i przekładamy do miski. Zeszklić na patelni cebule, następnie dodać do niej paprykę. Do delikatnie podsmażonej cebuli z papryka dokładamy cukinie, chwile podsmażamy i następnie dusimy przez około 5 minut, do czasu, aż warzywa staną się miękkie. Następnie wrzucamy pomidory pokrojone w kostkę, oraz ciecierzycę. Warzywa chwile poddusić, a następnie wrzucić do nich ugotowana kasze. Doprawić do smaku i chwile podsmażyć wszystko razem.'
	},
	{
		id: 4,
		name: 'Naleśniki, około 9 sztuk'.toUpperCase(),
		kind: 'naleśniki',
		img: '/img/nalesniki.jpg',
		ingriedients: [
			{
				type: 'Jajko',
				amount: 2
			},
			{
				type: 'Mleko',
				amount: '150 ml'
			},
			{
				type: 'Mąka pszenna',
				amount: '150 ml'
			}
		]
	},
	{
		id: 5,
		name: 'Sałatka z pieczonych batatów i ciecierzycy'.toUpperCase(),
		kind: 'sałatka',
		img: '/img/salatka_bataty.jpg',
		ingriedients: [
			{
				type: 'Bataty',
				amount: '500 g'
			},
			{
				type: 'Oliwa',
				amount: '2 łyżki'
			},
			{
				type: 'Puszka ugotowanej ciecierzycy (400 g)',
				amount: 1
			},
			{
				type: 'Pomidorki koktajlowe',
				amount: '100 g'
			},
			{
				type: 'Rukola',
				amount: '50 g'
			},
			{
				type:
					'przyprawy: sól, pieprz, po 2 łyżeczki mielonego kminu rzymskiego, ziół prowansalskich, słodkiej papryki oraz 1/2 łyżeczki chili',
				amount: 0
			}
		],
		recipe:
			'Piekarnik nagrzać do 200 stopni C (z termoobiegiem jeśli jest taka możliwość).Bataty obrać i pokroić w kosteczkę. Włożyć do miski, dodać przyprawy oraz 1 łyżkę oliwę i wszystko wymieszać.Rozłożyć na dużej blaszce do pieczenia lub większym naczyniu żaroodpornym i wstawić do piekarnika. Piec przez 10 minut. Dodać odcedzoną ciecierzycę, polać ją dodatkową łyżką oliwy, doprawić solą i pieprzem i wymieszać z batatami. Piec jeszcze przez ok. 10 minut (lub aż bataty będą miękkie i zaczną się rumienić). Upieczone warzywa wyłożyć do półmisków, dodać rukolę oraz pokrojone pomidorki koktajlowe. Doprawić je solą i pieprzem. Wymieszać składniki sosu z dodatkiem pieprzu i odrobiny soli i polać po sałatce. Przed jedzeniem wymieszać.'
	}
];

export default dishesDefault;
