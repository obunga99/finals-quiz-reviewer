/*
  Art Appreciation
  NOTE: These questions were written from the topic names only (no slides were provided).
  Double-check them against your own notes before the exam.

  Question format:
    q     - the question text
    a     - the correct answer (used by both styles)
    alt   - (optional) other accepted spellings for Identification
    d     - distractors for Multiple Choice (at least 3)
    only  - (optional) "mc" or "id" to limit a question to one style
*/
window.QUIZ_SUBJECTS = window.QUIZ_SUBJECTS || [];
window.QUIZ_SUBJECTS.push({
  id: "art-appreciation",
  title: "Art Appreciation",
  description: "Baroque, Neoclassicism, Cubism, Modern Art, Surrealism and Contemporary Art.",
  note: "Written from topic names only. Verify against your notes.",
  topics: [
    {
      name: "Baroque",
      questions: [
        { q: "Which art period (c. 1600–1750) is known for drama, movement, rich color and emotional intensity?", a: "Baroque", d: ["Neoclassicism", "Cubism", "Surrealism"] },
        { q: "Which Italian painter, famous for 'The Calling of St. Matthew', was a master of dramatic light and shadow?", a: "Caravaggio", d: ["Raphael", "Botticelli", "Michelangelo"] },
        { q: "What is the strong contrast between light and dark in a painting called?", a: "Chiaroscuro", d: ["Sfumato", "Impasto", "Pointillism"] },
        { q: "Which Dutch artist painted 'The Night Watch'?", a: "Rembrandt", alt: ["Rembrandt van Rijn"], d: ["Vincent van Gogh", "Peter Paul Rubens", "Diego Velázquez"] },
        { q: "Which sculptor created 'The Ecstasy of Saint Teresa'?", a: "Gian Lorenzo Bernini", alt: ["Bernini", "Lorenzo Bernini"], d: ["Michelangelo", "Antonio Canova", "Donatello"] },
        { q: "Which Spanish court painter created 'Las Meninas'?", a: "Diego Velázquez", alt: ["Velazquez", "Velázquez", "Diego Velazquez"], d: ["Francisco Goya", "Pablo Picasso", "El Greco"] },
        { q: "Which Dutch painter created 'Girl with a Pearl Earring'?", a: "Johannes Vermeer", alt: ["Vermeer", "Jan Vermeer"], d: ["Rembrandt", "Frans Hals", "Peter Paul Rubens"] },
        { q: "Which Flemish painter was known for dynamic compositions and full-figured subjects, as in 'The Elevation of the Cross'?", a: "Peter Paul Rubens", alt: ["Rubens"], d: ["Caravaggio", "Jan van Eyck", "Johannes Vermeer"] },
        { q: "Which French palace, built under Louis XIV, is a famous example of Baroque grandeur?", a: "Palace of Versailles", alt: ["Versailles", "Chateau de Versailles"], d: ["The Louvre", "The Pantheon", "Notre-Dame"] },
        { q: "Which institution promoted Baroque art to inspire faith during the Counter-Reformation?", a: "The Catholic Church", alt: ["Catholic Church", "Roman Catholic Church"], d: ["The French monarchy", "The Protestant Church", "The Bauhaus"] }
      ]
    },
    {
      name: "Neoclassicism",
      questions: [
        { q: "Which art movement (c. 1750–1830) drew inspiration from ancient Greece and Rome and valued order, reason and clarity?", a: "Neoclassicism", d: ["Baroque", "Surrealism", "Cubism"] },
        { q: "Neoclassicism arose partly as a reaction against the ornate style of which earlier movement?", a: "Rococo", alt: ["Baroque", "Baroque and Rococo"], d: ["Impressionism", "Cubism", "Renaissance"] },
        { q: "Which French painter created 'The Oath of the Horatii' and 'The Death of Marat'?", a: "Jacques-Louis David", alt: ["David", "Jacques Louis David"], d: ["Eugène Delacroix", "Claude Monet", "Édouard Manet"] },
        { q: "Which painter created 'La Grande Odalisque'?", a: "Jean-Auguste-Dominique Ingres", alt: ["Ingres", "Dominique Ingres", "Jean Auguste Dominique Ingres"], d: ["Jacques-Louis David", "Gustave Courbet", "Edgar Degas"] },
        { q: "Which Italian sculptor created 'Psyche Revived by Cupid's Kiss'?", a: "Antonio Canova", alt: ["Canova"], d: ["Gian Lorenzo Bernini", "Auguste Rodin", "Donatello"] },
        { q: "Which intellectual movement, also called the Age of Reason, influenced Neoclassical art?", a: "The Enlightenment", alt: ["Enlightenment", "Age of Enlightenment", "Age of Reason"], d: ["The Renaissance", "The Reformation", "The Industrial Revolution"] },
        { q: "Which German art historian described the ideal of 'noble simplicity and calm grandeur' in Greek art?", a: "Johann Joachim Winckelmann", alt: ["Winckelmann", "Johann Winckelmann"], d: ["Giorgio Vasari", "Clement Greenberg", "Sigmund Freud"] },
        { q: "Interest in classical antiquity grew after the excavation of which ancient Roman cities?", a: "Pompeii and Herculaneum", alt: ["Herculaneum and Pompeii", "Pompeii", "Herculaneum"], d: ["Athens and Sparta", "Carthage and Alexandria", "Troy and Mycenae"] },
        { q: "Which French emperor did Jacques-Louis David serve as official painter?", a: "Napoleon Bonaparte", alt: ["Napoleon", "Napoleon I"], d: ["Louis XIV", "Louis XVI", "Charlemagne"] },
        { q: "Which qualities are typical of Neoclassical art?", a: "Balance, symmetry and clean lines", alt: ["Balance and symmetry", "Symmetry", "Balance", "Clean lines"], d: ["Swirling movement and heavy ornament", "Fragmented shapes and multiple viewpoints", "Dream imagery and distorted objects"], only: "mc" }
      ]
    },
    {
      name: "Cubism",
      questions: [
        { q: "Which art movement (c. 1907–1914) broke objects into geometric shapes and showed them from several viewpoints at once?", a: "Cubism", d: ["Surrealism", "Impressionism", "Baroque"] },
        { q: "Which two artists pioneered Cubism? (Name the one who painted 'Les Demoiselles d'Avignon'.)", a: "Pablo Picasso", alt: ["Picasso"], d: ["Henri Matisse", "Salvador Dalí", "Marcel Duchamp"] },
        { q: "Who was Picasso's partner in developing Cubism?", a: "Georges Braque", alt: ["Braque"], d: ["Juan Gris", "Fernand Léger", "Paul Cézanne"] },
        { q: "Which phase of Cubism used muted browns and greys and broke subjects into many fragments?", a: "Analytic Cubism", alt: ["Analytical Cubism", "Analytic"], d: ["Synthetic Cubism", "Orphic Cubism", "Surreal Cubism"] },
        { q: "Which phase of Cubism introduced collage, brighter colors and simpler shapes?", a: "Synthetic Cubism", alt: ["Synthetic"], d: ["Analytic Cubism", "Pop Cubism", "Abstract Cubism"] },
        { q: "What technique involves gluing materials such as newspaper and wallpaper onto the canvas?", a: "Collage", alt: ["Papier collé", "Papier colle"], d: ["Fresco", "Impasto", "Lithography"] },
        { q: "Which Picasso painting (1937) shows the bombing of a Basque town during the Spanish Civil War?", a: "Guernica", d: ["The Weeping Woman", "The Old Guitarist", "Three Musicians"] },
        { q: "Which post-Impressionist's idea of treating nature through the cylinder, the sphere and the cone influenced Cubism?", a: "Paul Cézanne", alt: ["Cezanne", "Cézanne", "Paul Cezanne"], d: ["Vincent van Gogh", "Paul Gauguin", "Georges Seurat"] },
        { q: "Which critic is credited with coining the term 'Cubism' after describing Braque's 'little cubes'?", a: "Louis Vauxelles", alt: ["Vauxelles"], d: ["André Breton", "Clement Greenberg", "Giorgio Vasari"] },
        { q: "Which Spanish painter, besides Picasso, was a leading Cubist and especially known for Synthetic Cubism?", a: "Juan Gris", alt: ["Gris"], d: ["Joan Miró", "Salvador Dalí", "Diego Rivera"] }
      ]
    },
    {
      name: "Modern Art",
      questions: [
        { q: "Which broad term describes art from roughly the 1860s to the 1970s that broke away from traditional academic rules?", a: "Modern Art", alt: ["Modernism", "Modern"], d: ["Contemporary Art", "Baroque", "Neoclassicism"] },
        { q: "Which painter's 'Impression, Sunrise' gave Impressionism its name?", a: "Claude Monet", alt: ["Monet"], d: ["Édouard Manet", "Pierre-Auguste Renoir", "Edgar Degas"] },
        { q: "Which Post-Impressionist painted 'The Starry Night'?", a: "Vincent van Gogh", alt: ["Van Gogh", "Vincent Van Gogh"], d: ["Paul Cézanne", "Claude Monet", "Henri Matisse"] },
        { q: "Which Abstract Expressionist is famous for his drip paintings?", a: "Jackson Pollock", alt: ["Pollock"], d: ["Mark Rothko", "Willem de Kooning", "Andy Warhol"] },
        { q: "Which artist led Fauvism ('the wild beasts') and painted 'The Dance'?", a: "Henri Matisse", alt: ["Matisse"], d: ["Pablo Picasso", "Paul Gauguin", "Wassily Kandinsky"] },
        { q: "Which artist submitted a urinal titled 'Fountain' in 1917 as a 'readymade'?", a: "Marcel Duchamp", alt: ["Duchamp"], d: ["Andy Warhol", "Salvador Dalí", "Piet Mondrian"] },
        { q: "Which Pop Art artist is known for 'Campbell's Soup Cans'?", a: "Andy Warhol", alt: ["Warhol"], d: ["Roy Lichtenstein", "Jasper Johns", "Jackson Pollock"] },
        { q: "Which Norwegian Expressionist painted 'The Scream'?", a: "Edvard Munch", alt: ["Munch"], d: ["Gustav Klimt", "Egon Schiele", "Vincent van Gogh"] },
        { q: "Which Russian artist is often credited with painting some of the first purely abstract works?", a: "Wassily Kandinsky", alt: ["Kandinsky", "Vassily Kandinsky"], d: ["Kazimir Malevich", "Marc Chagall", "Piet Mondrian"] },
        { q: "Which Dutch artist of De Stijl painted grids of primary colors and black lines, as in 'Composition with Red, Blue and Yellow'?", a: "Piet Mondrian", alt: ["Mondrian"], d: ["Wassily Kandinsky", "Paul Klee", "Theo van Doesburg"] }
      ]
    },
    {
      name: "Surrealism",
      questions: [
        { q: "Which art movement, begun in the 1920s, explores dreams and the unconscious mind?", a: "Surrealism", d: ["Cubism", "Neoclassicism", "Baroque"] },
        { q: "Who wrote the first 'Surrealist Manifesto' in 1924?", a: "André Breton", alt: ["Breton", "Andre Breton"], d: ["Salvador Dalí", "Max Ernst", "Marcel Duchamp"] },
        { q: "Which artist painted 'The Persistence of Memory' with its melting clocks?", a: "Salvador Dalí", alt: ["Dali", "Dalí", "Salvador Dali"], d: ["René Magritte", "Joan Miró", "Max Ernst"] },
        { q: "Which Belgian artist painted 'The Treachery of Images' ('This is not a pipe')?", a: "René Magritte", alt: ["Magritte", "Rene Magritte"], d: ["Salvador Dalí", "Giorgio de Chirico", "Marc Chagall"] },
        { q: "Whose theories of dreams and the unconscious mind influenced the Surrealists?", a: "Sigmund Freud", alt: ["Freud"], d: ["Carl Jung", "Karl Marx", "Charles Darwin"] },
        { q: "Which Surrealist technique involves creating art without conscious control, letting the unconscious guide the hand?", a: "Automatism", alt: ["Automatic drawing", "Psychic automatism"], d: ["Chiaroscuro", "Pointillism", "Photorealism"] },
        { q: "Which earlier anti-art movement did Surrealism grow out of?", a: "Dada", alt: ["Dadaism"], d: ["Fauvism", "Futurism", "Rococo"] },
        { q: "Which Spanish (Catalan) artist is known for playful, dreamlike forms in works such as 'The Tilled Field'?", a: "Joan Miró", alt: ["Miro", "Miró", "Joan Miro"], d: ["Pablo Picasso", "Salvador Dalí", "Juan Gris"] },
        { q: "Which German artist developed the frottage technique and made collage novels?", a: "Max Ernst", alt: ["Ernst"], d: ["Paul Klee", "Hans Arp", "George Grosz"] },
        { q: "Which Mexican painter, known for her self-portraits, was called a Surrealist by André Breton although she rejected the label?", a: "Frida Kahlo", alt: ["Kahlo"], d: ["Diego Rivera", "Georgia O'Keeffe", "Remedios Varo"] }
      ]
    },
    {
      name: "Contemporary Art",
      questions: [
        { q: "Which term refers to art made from roughly the late 20th century to the present?", a: "Contemporary Art", alt: ["Contemporary"], d: ["Modern Art", "Baroque", "Neoclassicism"] },
        { q: "Which art form creates immersive, often room-sized works designed for a specific space?", a: "Installation art", alt: ["Installation"], d: ["Portraiture", "Printmaking", "Still life"] },
        { q: "Which art form uses the artist's own live actions as the artwork?", a: "Performance art", alt: ["Performance"], d: ["Installation art", "Digital art", "Photorealism"] },
        { q: "In which kind of art is the idea more important than the finished object?", a: "Conceptual art", alt: ["Conceptualism", "Conceptual"], d: ["Photorealism", "Impressionism", "Pop art"] },
        { q: "Which Japanese artist is known for her polka dots and 'Infinity Mirror Rooms'?", a: "Yayoi Kusama", alt: ["Kusama"], d: ["Yoko Ono", "Takashi Murakami", "Hokusai"] },
        { q: "Which anonymous street artist created 'Girl with Balloon', which partly shredded itself after being sold in 2018?", a: "Banksy", d: ["Shepard Fairey", "Jean-Michel Basquiat", "Keith Haring"] },
        { q: "Which artist is known for his shiny 'Balloon Dog' sculptures?", a: "Jeff Koons", alt: ["Koons"], d: ["Damien Hirst", "Andy Warhol", "Anish Kapoor"] },
        { q: "Which British artist created 'The Physical Impossibility of Death in the Mind of Someone Living', featuring a shark in formaldehyde?", a: "Damien Hirst", alt: ["Hirst"], d: ["Banksy", "Tracey Emin", "Antony Gormley"] },
        { q: "Which Chinese artist created 'Sunflower Seeds' for the Tate Modern in 2010?", a: "Ai Weiwei", alt: ["Ai Wei Wei"], d: ["Yayoi Kusama", "Cai Guo-Qiang", "Zhang Xiaogang"] },
        { q: "Which type of art uses digital technology as part of the creative process or presentation?", a: "Digital art", alt: ["New media art", "New media"], d: ["Fresco", "Lithography", "Impasto"] }
      ]
    }
  ]
});
