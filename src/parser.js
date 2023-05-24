function parseCourses(coursesString) {
  //const regex = /^(.*?)Prerequisites:\s*

  const courseStrings = coursesString.split(/(?<=(?:Course Component:|Volet :).*?\n\n.*?\n\n)/i);///(?<=Prerequisit(?:e|es).*?\n\n)/i);///(?=prerequisites.*\n\n)/i)//(/Prerequisites:\s*(.*?)\n{2,}/); // Split by 2 or more newlines
  console.log(courseStrings[17])
  const courses = []
  for (let i = 0; i < courseStrings.length; i++) {
    if (courseStrings[i].includes("Volet"))
    {

    }
    else{
      courses.push(parseCourse(courseStrings[i]));
      console.log(courses + i)
    }
  }
  //const courses = courseStrings.map(parseCourse);
  return courses;
}
function getClassCode(string) {
  const regex = /[A-Z]{3}\s*\d{4}/
  return string.match(regex);
}

function parseCourse(courseString) {
  let regex = /^([A-Z]+)\s+(\d+)\s+(.*?)\s+\((\d+)\s+units\)\s*(.*?)\s*Course Component:\s*(.*?)\s*Prerequisit(?:e|es)\s*:\s*(.*?)\s*$/s;
  let match = courseString.match(regex);
  let hasPrerequisites = true;
  let prerequisitesObject = []
  if (!match) {
    //throw new Error("Invalid course string");
    regex = /^([A-Z]+)\s+(\d+)\s+(.*?)\s+\((\d+)\s+units\)\s*(.*?)\s*Course Component:\s*(.*?)\n\n\s*(.*?)\s*$/s;
    match = courseString.match(regex);
    hasPrerequisites = false;
  }
  if (!match) {
    //throw new Error("Invalid course string");
    console.log("Invalid Course string"+ courseString)
    return
  }

  const [, code, number, title, units, description, component, prerequisites] = match;
  let ThePrerequisites = ""
  let prerequisitesList = ""
  if (hasPrerequisites) {
    ThePrerequisites = prerequisites.split(".").map(p => p.trim());
    prerequisitesList = ThePrerequisites[0].split(/(?<=[A-Z]{3}\s*\d{4})/i) //prerequisites.split(/(?:,|or)\s+/).map(p => p.trim());
    //alert(prerequisitesList)
    const pattern = /or/;

    let totalObjects = 0
    const firstclass = getClassCode(prerequisitesList[0])
    if (firstclass) {
      const [test,coursetype,coursenum] = firstclass[0].match(/([A-Z]{3})\s*(\d{4})/)
      prerequisitesObject.push([{coursetype,coursenum}])//[firstclass[0].replace(/ /g,'')])//[prerequisitesList[0].trim()])
      for (let i = 1; i < prerequisitesList.length; i++) {

        if (pattern.test(prerequisitesList[i])) {
          //alert(totalObjects+prerequisitesList[i])
          const theclass = getClassCode(prerequisitesList[i])
          if (theclass){
            const [test,coursetype,coursenum] = theclass[0].match(/([A-Z]{3})\s*(\d{4})/)
            prerequisitesObject[totalObjects].push({coursetype,coursenum})//[prerequisitesList[i].trim()])
          }
            //prerequisitesObject[totalObjects].push(theclass[0].replace(/ /g,''))//prerequisitesList[i].trim())
        }
        else {
          //prerequisitesList[i] = prerequisitesList[i].trim()
          const theclass = getClassCode(prerequisitesList[i])
          if (theclass){

            const [test,coursetype,coursenum] = theclass[0].match(/([A-Z]{3})\s*(\d{4})/)
            prerequisitesObject.push([{coursetype,coursenum}])//[prerequisitesList[i].trim()])
          }
          totalObjects += 1
        }

      }
    }
  }

  //then check for ors and trim

  
  return {
    prerequisites: prerequisitesObject,
    prerequisitesnum : [],
    coursetype: code,
    coursenum: number,
    //courseCode: code + number,
    //number: //parseInt(number),
    name: title,
    units: parseInt(units),
    description: description.trim(),
    component: component.trim(),
    svgnum:[]
    //prerequisitesList
  };
}
export function doParse() {
  const coursesString = `MAT 1300 Mathematical Methods I (3 units)

Review of elementary functions. Limits. Geometric series. Differential and integral calculus in one variable with applications. Functions of several variables. Partial derivatives.

Course Component: Discussion Group, Lecture

Prerequisites: One of Calculus and Vectors (MCV4U) or MAT 1339. The courses MAT 1300, MAT 1308, MAT 1320, MAT 1330 cannot be combined for units. This course is intended primarily for students in the School of Management.

MAT 1302 Mathematical Methods II (3 units)

Solution of systems of linear equations. Matrix algebra. Determinants. Complex numbers, fundamental theorem of algebra. Eigenvalues and eigenvectors of real matrices. Introduction to vector spaces, linear independence, bases. Applications. This course is intended primarily for students in the School of Management and the Faculty of Social Sciences.

Course Component: Discussion Group, Lecture

Prerequisites: One of Ontario 4U Mathematics of Data Management (MDM 4U), Ontario 4U Advanced Functions (MHF4U), MAT1318, MAT1339 or an equivalent. The courses MAT1302, MAT1341 cannot be combined for units.

MAT 1303 Mathematical Methods III (3 units)

Sequences, series, power series, Taylor series. Difference equations: the general solution of linear equations with constant coefficients. Additional techniques of integration. Improper integrals. Chain rule for functions of several variables. Gradient, Directional derivative, tangent plane. Partial derivatives of higher order. Extreme with or without constraints.

Course Component: Lecture

Prerequisite: MAT 1300 or MAT 1329. MAT 1302 is corequisite to MAT 1303. The courses MAT 1303, MAT 1322, MAT 1325, MAT 1332 cannot be combined for units.

MAT 1308 Introduction to Calculus (3 units)

Review of elementary functions. Introduction to Limits. Geometric series. Introduction to differential and integral calculus in one variable with applications. Linear approximations, applications to optimization. Students who have previously studied the derivative and differentiation rules should take MAT 1300 instead. This course is reserved primarily for students in the Faculties of Arts and Social Sciences. Students who have taken MCV4U, MAT1339 or an equivalent are strongly encouraged to register for MAT1300 instead.

Course Component: Discussion Group, Lecture

Prerequisite: One of Advanced Functions (MHF4U) or MAT 1318 or an equivalent. The course MAT 1308, MAT 1300, MAT 1320, MAT 1321, MAT 1327, MAT 1329, MAT 1330 cannot be combined for units.

MAT 1318 Functions (3 units)

Polynomial and rational functions: factoring, the remainder theorem, families of polynomials with specified zeros, odd and even polynomial functions. Logarithms and exponentials to various bases, their laws. Trigonometric functions: radian measure, values of primary trigonometric ratios, compound angle formulae, trigonometric identities. Solving equations and inequalities involving absolute values, polynomial, rational, logarithmic, exponential and trigonometric functions. Their graphs. Operations on functions: point-wise addition and multiplication, composition; inverse functions. Average and instantaneous rate of change, approximating instantaneous rate of change, secants and tangents to graphs. Applications to graphing and finding maxima and minima of functions. Using functions to model, interpolate, and extrapolate data. MAT1318 may be taken for upgrading purposes as an admission requirement. In all cases, credits for this course do not count as part of any program requirements. S/NS grading scheme.

Course Component: Lecture

Prerequisite: Ontario grade 11 Functions (MCR3U) or the equivalent. The courses MAT 1318, Ontario 4U Advanced Functions (MHF4U) or any equivalent cannot be combined for units.

MAT 1320 Calculus I (3 units)

Intuitive definition of limits; continuity, statement of intermediate value theorem. Quick review of basic derivative formulas: products, chain rule, exponentials, and trigonometric functions. Derivatives of quotients, logarithms, inverse trigonometric functions. Finite difference approximations of derivatives. Analysis of functions via the first and the second derivatives; statements of extreme and mean value theorems. L'Hospital's rule. Implicit differentiation, related rates, optimization, linear approximation, Newton s method. The definite integral and the fundamental theorem of calculus. Antiderivatives of elementary functions, techniques of integration (integration by parts, substitutions, partial fractions). Numerical integration: mid-point, trapezoidal rule and Simpson's rule; error analysis.

Course Component: Discussion Group, Lecture

Prerequisite: One of MAT 1339, Ontario 4U Calculus and Vectors (MCV4U) or an equivalent. The courses MAT 1300, MAT 1308, MAT 1320, MAT 1321, MAT 1327, MAT 1329, MAT 1330 cannot be combined for units.

MAT 1321 Intensive Calculus I (3 units)

Instantaneous rate of change and definition of limits; continuity, statement of intermediate value theorem. Derivatives of polynomials using limits, derivatives of sums, products, the chain rule, derivatives of rational, trigonometric, exponential, and radical functions. Derivatives of quotients, logarithms, inverse trigonometric functions. Finite difference approximations of derivatives. Analysis of functions via the first and the second derivatives. Applications to finding maxima and minima. Concavity and points of inflection, and graph sketching; statements of extreme and mean value theorems. L'Hospital's rule. Implicit differentiation, related rates, optimization, linear approximation, Newton’s method. The definite integral and the fundamental theorem of calculus. Antiderivatives of elementary functions, techniques of integration (integration by parts, substitutions, partial fractions). Numerical integration: mid-point, trapezoidal rule and Simpson's rule; error analysis.

Course Component: Discussion Group, Lecture

Prerequisite : One of MAT 1318, Ontario 4U Advanced Functions (MHF4U) or an equivalent. The courses MAT 1321, MAT 1320, MAT 1300, MAT 1308, MAT 1329, MAT 1327, MAT 1330 cannot be combined for units.

MAT 1322 Calculus II (3 units)

Improper integrals. Applications of the integral. Separable differential equations. Euler's method for differential equations. Sequences, series. Taylor's formula and series. Functions of two and three variables. Partial derivatives, the chain rule, directional derivatives, tangent planes and normal lines.

Course Component: Discussion Group, Lecture

Prerequisite: MAT 1320 or MAT 1321. The courses MAT 1322, MAT 1303, MAT 1332, MAT 1325 cannot be combined for units.

MAT 1325 Calculus II and an Introduction to Analysis (3 units)

A second course in calculus emphasizing geometric and physical intuition in which attention is also given to the conceptual foundations of calculus-analysis. Review of inequalities. Sequences. Completeness axiom of the real numbers. Continuity. Proofs of some of: the intermediate and extreme value theorems, the mean value theorem. Taylor's theorem. Standard curves and surfaces in 2 and 3-space. Tangent vectors, planes and normals. Partial derivatives, directional derivatives, derivatives as linear maps.

Course Component: Discussion Group, Lecture

Prerequisite: MAT 1320 or MAT 1321. The courses MAT 1325, MAT 1303, MAT 1322, MAT 1332 cannot be combined for units. This course is primarily intended for students who have an interest in pursuing advanced courses in mathematics.

MAT 1327 Intensive Calculus for the Life Sciences I (3 units)

Instantaneous rate of change and definition of limits; continuity. Derivatives of polynomials using limits, product and quotient rules, chain rule, derivative of exponential, logarithm and basic trigonometric functions, higher derivatives, curve sketching. Applications of the derivative to life sciences. Discrete dynamical systems: equilibrium points, stability, cobwebbing. Integrals: indefinite and definite integrals, fundamental theorem of calculus, antiderivatives, substitution, integration by parts. Applications of the integral to life sciences.

Course Component: Discussion Group, Lecture

Prerequisite : One of MAT 1318, Ontario 4U Advanced Functions (MHF4U) or an equivalent. The courses MAT 1327, MAT 1330, MAT 1300, MAT 1308, MAT 1320, MAT 1321, MAT 1329 cannot be combined for units.

MAT 1329 Intensive Mathematical Methods I (3 units)

Instantaneous rate of change and definition of limits; continuity. Derivatives of polynomials using limits, derivatives of sums, products, the chain rule, derivatives of rational, exponential, and radical functions. Derivatives of quotients, logarithms. Analysis of functions via the first and the second derivatives. Applications to finding maxima and minima. Concavity and points of inflection, and graph sketching; Implicit differentiation, related rates, optimization. Geometric series. Integral calculus in one variable with applications. Functions of several variables. Partial derivatives.

Course Component: Discussion Group, Lecture

Prerequisite: One of MAT 1318, Ontario 4U Advanced Functions (MHF4U) or an equivalent. The courses MAT 1329, MAT 1320, MAT 1321, MAT 1300, MAT 1308, MAT 1327, MAT 1330 cannot be combined for units.

MAT 1330 Calculus for the Life Sciences I (3 units)

Derivatives: product and quotient rules, chain rule, derivative of exponential, logarithm and basic trigonometric functions, higher derivatives, curve sketching. Applications of the derivative to life sciences. Discrete dynamical systems: equilibrium points, stability, cobwebbing. Integrals: indefinite and definite integrals, fundamental theorem of calculus, antiderivatives, substitution, integration by parts. Applications of the integral to life sciences.

Course Component: Discussion Group, Lecture

Prerequisite: One of MAT 1339, Ontario 4U Calculus and Vectors (MCV4U) or an equivalent. The courses MAT 1300, MAT 1308, MAT 1320, MAT 1321, MAT 1327, MAT 1329, MAT1330 cannot be combined for units.

MAT 1332 Calculus for the Life Sciences II (3 units)

Integrals: numerical integration; improper integrals. Introduction to differential equations: some techniques to solve simple differential equations, numerical solution of differential equations and models in the life sciences using differential equations. Introduction to linear algebra: matrices and matrix algebra, determinants, eigenvalues and eigenvectors (in two or three dimensions). Functions of several variables: graphical representations, partial derivatives. Systems of differential equations: equilibrium points, stability, phase portrait and global analysis.

Course Component: Discussion Group, Lecture

Prerequisite: MAT 1330 or MAT 1327.The courses MAT 1332, MAT 1303, MAT 1322, MAT 1325 cannot be combined for units. This course is primarily intended for students registered in a life sciences program. Please verify your program requirements.

MAT 1339 Introduction to Calculus and Vectors (3 units)

Instantaneous rate of change as a limit, derivatives of polynomials using limits, derivatives of sums, products, the chain rule, derivatives of rational, trigonometric, exponential, logarithmic, and radical functions. Applications to finding maxima and minima and graph sketching. Concavity and points of inflection, the second derivative. Optimization in models involving polynomial, rational, and exponential functions. Vectors in two and three dimensions. Cartesian, polar and geometric forms. Algebraic operations on vectors, dot product, cross product. Applications to projections, area of parallelograms, volume of parallelepipeds. Scalar and vector parametric form of equations of lines and planes in two and three dimensions. Intersections of lines and planes. Solution of up to three equations in three unknowns by elimination or substitution. Geometric interpretation of the solutions. Prerequisite: Ontario 4U Functions (MHF4U) or MAT1318 or equivalent. The courses MAT1339, Ontario 4U Calculus and Vectors (MCV4U) or any equivalent cannot be combined for credits. MAT1339 may be taken for upgrading purposes or as an admission requirement In all cases, credits for this course do not count as part of any program requirements. S/NS grading scheme.

Course Component: Discussion Group, Lecture

Prerequisite: Ontario 4U Functions (MHF4U) or MAT 1318 or equivalent. The courses MAT 1339, Ontario 4U Calculus and Vectors (MCV4U) or any equivalent cannot be combined for units.

MAT 1341 Introduction to Linear Algebra (3 units)

Review of complex numbers. The fundamental theorem of algebra. Review of vector and scalar products, projections. Introduction to vector spaces, linear independence, bases; function spaces. Solution of systems of linear equations, matrix algebra, determinants, eigenvalues and eigenvectors. Gram Schmidt, orthogonal projections. Linear transformations, kernel and image, their standard matrices. Applications (e.g. geometry, networks, differential equations)

Course Component: Discussion Group, Lecture

Prerequisite: MAT1339 or Ontario 4U Calculus and Vectors (MCV4U), or an equivalent. The courses MAT1341, MAT1302 cannot be combined for units.

MAT 1348 Discrete Mathematics for Computing (3 units)

Introduction to discrete structures as a foundation to computing. Propositional logic. Fundamental structures: functions, relations, sets. The basics of counting: counting arguments, the pigeonhole principle, permutations and combinations. Introduction to proofs: direct, by contradiction, by cases, induction. Topics in graph theory: isomorphism, cycles, trees, directed graphs. Whenever possible applications from computing and information technology will be included.

Course Component: Discussion Group, Lecture

Prerequisite: MAT 1318 or Ontario 4U Advanced Functions (MHF4U) or equivalent. This course cannot be taken for units by any student who has previously received units for MAT 2348. Courses MAT 1348, MAT 1362 cannot be combined for units..

MAT 1362 Mathematical Reasoning and Proofs (3 units)

Elements of logic, set theory, functions, equivalence relations and cardinality. Proof techniques. Concepts are introduced using sets of integers, integers modulo n, rational, real and complex numbers. Exploration of the real line: completeness, supremum, sequences and limits. Some of the concepts will be illustrated with examples from geometry, algebra and number theory.

Course Component: Discussion Group, Lecture

Prerequisite: MAT 1339 or Ontario 4U Calculus and Vectors (MCV4U) or an equivalent. MAT 1362, MAT 1348 cannot be combined for units.

MAT 1371 Descriptive Statistics (3 units)

Topics from descriptive statistics: histograms and boxplot; average and observed standard deviation; elementary probability; normal distribution; statistical estimation and hypothesis testing; correlation and regression. Examples analyzed with statistical software.

Course Component: Discussion Group, Lecture

The courses MAT1371, MAT2371, MAT2377, MAT2379 cannot be combined for units. This course cannot count for unit in any program in the Faculty of Science or Engineering.

MAT 1372 Elements of Probability and Statistical Inference (3 units)

Probability distributions. Law of large numbers and the central limit theorem. Sampling. Applications of probability. Testing with the normal, t and chi-square distributions. Correlation and regression.

Course Component: Laboratory, Lecture

Prerequisite: MAT 1371. The courses MAT 1372, MAT 2371, MAT 2377, MAT 2379 cannot be combined for units. This course cannot count for unit in any program in the Faculty of Science.

MAT 1373 Data Analysis By Computer (3 units)

Introduction to a statistical package on a computer. Descriptive statistics and data analysis by computer. The distributions and applications of standard parametric and nonparametric tests are investigated using the simulation function of a statistical package.

Course Component: Lecture

The courses MAT 1373, MAT 2371, MAT 2377, MAT 2379 cannot be combined for units. This course cannot count for unit in any program in the Faculty of Science.

MAT 1374 Probability and Games of Chance: Poker 101 (3 units)

An introduction to elementary probability theory, game theory, and the mathematical underpinning of games of chance, demonstrated through their applications to poker games such as Texas Hold'em. Societal aspects of gaming.

Course Component: Lecture

This course cannot count as a science elective for students in the Faculty of Science.

MAT 1395 The Beauty of Mathematics (3 units)

Selected topics from modern and ancient mathematics. Course content varies from year to year. Chosen themes may include, but are not limited to: classical geometry, number theory, chaos theory and mathematics for elementary school teachers. See the Department of Mathematics and Statistics for the current year's offering.

Course Component: Lecture

Prerequisite: This course cannot count as a science elective for students in the Faculty of Science.

MAT 1700 Méthodes mathématiques I (3 crédits)

Révision des fonctions élémentaires. Limites. Séries géométriques. Calcul différentiel et intégral des fonctions d'une variable et applications. Fonctions de plusieurs variables. Dérivées partielles.

Volet : Groupe de discussion, Cours magistral

Préalable : Calcul et vecteurs (MCV4U) ou MAT 1739. Les cours MAT 1700, MAT 1708, MAT 1720, MAT 1730 ne peuvent être combinés pour l'obtention de crédits. Ce cours s'adresse principalement aux étudiants et étudiantes de l'École de gestion.

MAT 1702 Méthodes mathématiques II (3 crédits)

Solutions de systèmes d'équations linéaires. Algèbre des matrices. Déterminants. Nombres complexes, théorème fondamental de l'algèbre. Valeurs et vecteurs propres de matrices réelles. Introduction aux espaces vectoriels, indépendance linéaire, bases. Applications. Préalable : Un des cours suivants : Mathématiques 4U de l'Ontario ou Mathématiques de la gestion de données (MDM 4U) ou Fonctions avancées (MHF4U), MAT 1718, MAT 1739 ou un cours équivalent. Les cours MAT 1702, MAT 1741 ne peuvent être combinés pour l'obtention de crédits. Ce cours s'adresse principalement aux étudiants et étudiantes de l'École de Gestion et de la Faculté des Sciences Sociales.

Volet : Groupe de discussion, Cours magistral

Préalable : Mathématiques 4U de l'Ontario ou Mathématiques de la gestion de données (MDM 4U) ou Fonctions avancées (MHF4U), MAT 1718, MAT 1739 ou un cours équivalent. Les cours MAT 1702, MAT 1741 ne peuvent être combinés pour l'obtention de crédits.

MAT 1703 Méthodes mathématiques III (3 crédits)

Suites, séries, séries entières, séries de Taylor. Équations aux différences finies: la solution générale des équations linéaires à coefficients constants. Approfondissement des méthodes d'intégration. Intégrales impropres. Dérivées des fonctions composées à plusieurs variables. Gradient, dérivée dans une direction, plan tangent. Dérivées partielles d'ordre supérieur. Extremums avec ou sans contraintes. Intégrales doubles.

Volet : Cours magistral

Préalable : MAT 1700 ou MAT 1729. MAT 1702 est concomitant à MAT 1703. Les cours MAT 1703, MAT 1722, MAT 1725, MAT 1732 ne peuvent être combinés pour l'obtention de crédits.

MAT 1708 Introduction au calcul différentiel et intégral (3 crédits)

Révision des fonctions élémentaires, introduction aux limites, séries géométriques, introduction au calcul différentiel et intégral de fonctions d'une variable, applications de la dérivée et de l'intégrale, approximation linéaire, applications aux problèmes d'optimisation. Les étudiant(e)s qui ont déja étudié la dérivée et les règles de dérivation devraient plutôt s'inscrire à MAT 1700. Ce cours est principalement réservé aux étudiants et étudiantes de la Faculté des Arts et de la Faculté des Sciences Sociales. Les étudiants qui ont complété MCV4U, MAT 1739 ou l'équivalent sont fortement encouragés à s'inscrire à MAT 1700 au lieu de MAT 1708.

Volet : Groupe de discussion, Cours magistral

Préalable : Un des cours suivants : Fonctions avancées (MHF4U) ou MAT 1718 ou l'équivalent. Les cours MAT 1708, MAT 1700, MAT 1720, MAT 1721, MAT 1727, MAT 1729, MAT 1730 ne peuvent être combinés pour l'obtention de crédits.

MAT 1718 Fonctions (3 crédits)

Fonctions polynômiales et rationnelles: factorisation, le théorème du reste, familles de polynômes avec des zéros spécifiés, fonctions polynômiales paires et impaires. Logarithme et exponentiel de bases différentes, leurs lois. Fonctions trigonométriques: mesure en radian, valeurs des quotients trigonométriques principaux, formules des angles composés, identités trigonométriques. Solution des équations et inégalités concernant des valeurs absolues, des fonctions polynômiales, rationnelles, exponentielles et logarithmiques. Leurs graphes. Opérations sur les fonctions: addition et multiplication ponctuelles, composition; fonctions inverses. Taux de variation moyen et instantané, approximation du taux de variation instantané, les sécantes et les tangentes aux graphes. Applications aux études des courbes, maximums et minimums des fonctions. Utilisation des fonctions pour modéliser, interpoler et extrapoler des données. MAT 1718 est un cours de mise à niveau. Il peut être suivi à ce titre ou pour répondre d'une condition d'admission. Dans tous les cas, il ne saurait être retenu pour crédits aux fins des exigences de programmes. Noté S/NS.

Volet : Cours magistral

Préalable : Les Mathématiques de la 11e année de l'Ontario Fonctions (MCR3U) ou tout équivalent. Les cours MAT 1718, Mathématiques 4U de l'Ontario Fonctions avancées (MHF4U) ne peuvent être combinés pour l'obtention de crédits.

MAT 1720 Calcul différentiel et intégral I (3 crédits)

Définition intuitive de la limite; la continuité; énoncé du théorème des valeurs intermédiaires. Brève revue des formules fondamentales de dérivation: produits, exponentielles, et fonctions trigonométriques. Dérivées des quotients de fonctions, des logarithmes et des fonctions trigonométriques inverses. Approximation numérique des dérivées par des différences finies. Études de fonctions à l'aide des dérivées premières et secondes; énoncés des théorèmes des bornes atteintes et des accroissements finis. Règle de l'Hospital. Dérivée implicite, taux reliés, optimisation, approximation linéaire, la méthode de Newton. L'intégrale définie et le théorème fondamental. Primitives de fonctions élémentaires, méthodes d'intégration (intégration par parties, substitutions, fractions partielles). Intégration numérique: les formules du point milieu, du trapèze et de Simpson; analyse de l'erreur.

Volet : Groupe de discussion, Cours magistral

Préalable : MAT 1739 ou Mathématiques 4U de l'Ontario Calcul et vecteurs (MCV4U) ou l'équivalent. Les cours MAT 1700, MAT 1708, MAT 1720, MAT 1721, MAT 1727, MAT 1729, MAT 1730 ne peuvent être combinés pour l'obtention de crédits.

MAT 1721 Calcul différentiel et intégral I (3 crédits)

Taux de variation instantané et définition de la limite; la continuité; énoncé du théorème des valeurs intermédiaires. Dérivées des polynômes en utilisant les limites, dérivées des sommes, produits, fonctions composées, dérivées des fonctions rationnelles, trigonométriques, et radicales, exponentielles. Dérivées des quotients de fonctions, des logarithmes et des fonctions trigonométriques inverses. Approximation numérique des dérivées par des différences finies. Études de fonctions à l'aide des dérivées premières et secondes; applications: maximums, minimums, et représentations graphiques. Concavité et points d'inflexion, la dérivée seconde. Énoncés des théorèmes des bornes atteintes et des accroissements finis. Règle de l'Hospital. Dérivée implicite, taux reliés, optimisation, approximation linéaire, la méthode de Newton. L'intégrale définie et le théorème fondamental. Primitives de fonctions élémentaires, méthodes d'intégration (intégration par parties, substitutions, fractions partielles). Intégration numérique: les formules du point milieu, du trapèze et de Simpson; analyse de l'erreur.

Volet : Groupe de discussion, Cours magistral

Préalable : MAT 1718 ou Fonctions avancées 4U de l'Ontario (MHF4U) ou l'équivalent. Les cours MAT 1721, MAT 1720, MAT 1700, MAT 1708, MAT 1729, MAT 1727, MAT 1730 ne peuvent être combinés pour l'obtention de crédits.

MAT 1722 Calcul différentiel et intégral II (3 crédits)

Intégrales impropres. Applications de l'intégrale. Équations différentielles séparables. La méthode d'Euler pour les équations différentielles. Suites et séries. Formule de Taylor et séries de Taylor. Fonctions de deux et de trois variables. Dérivées partielles, dérivation en chaîne, dérivées directionnelles, plans tangents et droites normales.

Volet : Groupe de discussion, Cours magistral

Préalable : MAT 1720 ou MAT 1721. Les cours MAT 1722, MAT 1703, MAT 1725, MAT 1732 ne peuvent être combinés pour l'obtention de crédits.

MAT 1725 Calcul différentiel et intégral II et introduction à l'analyse mathématique (3 crédits)

Ce deuxième cours de calcul différentiel et intégral privilégie l'intuition géométrique et physique tout en tenant compte des concepts fondamentaux de l'analyse mathématique. Révision des inégalités. Suites. Axiome de complétude des nombres réels. Continuité. Présentation des théorèmes des valeurs intermédiaires, du maximum, des accroissements finis, de Taylor et démonstration de certains d'entre eux. Courbes et surfaces standards dans R¢2 et R¢3. Fonctions de 2 et de 3 variables. Dérivées partielles, dérivées directionnelles, dérivée vue comme application linéaire. Plans tangents et droites normales.

Volet : Groupe de discussion, Cours magistral

Préalable : MAT 1720 ou MAT 1721. Les cours MAT 1725, MAT 1703, MAT 1722, MAT 1732 ne peuvent être combinés pour l'obtention de crédits. Ce cours est destiné aux étudiants et étudiantes intéressés à poursuivre des cours avancés en mathématiques.

MAT 1727 Calcul différentiel et intégral pour les sciences de la vie I (3 crédits)

Taux de variation instantané et définition de la limite; la continuité. Dérivées des polynômes en utilisant les limites, règles du produit et du quotient, dérivée de fonctions composées, dérivée des fonctions exponentielles, des fonctions logarithmiques et des fonctions trigonométriques de base, dérivées d'ordre supérieur, graphes de fonctions. Applications de la dérivée aux sciences de la vie. Systèmes dynamiques discrets, points d'équilibre, stabilité, diagramme en forme de toiles d'araignées. Intégrales: intégrales définies et indéfinies, théorème fondamental du calcul, primitives, méthodes d'intégration par substitution et par parties. Applications de l'intégrale aux sciences de la vie.

Volet : Groupe de discussion, Cours magistral

Préalable : MAT 1718 ou Fonctions avancées 4U de l'Ontario (MHF4U) ou l'équivalent. Les cours MAT 1727, MAT 1730, MAT 1700, MAT 1708, MAT 1720, MAT 1721, MAT 1729 ne peuvent être combinés pour l'obtention de crédits.

MAT 1729 Méthodes mathématiques I (3 crédits)

Taux de variation instantané et définition de la limite; la continuité. Dérivées des polynômes en utilisant les limites, dérivées des sommes, produits, fonctions composées, dérivées des fonctions rationnelles, et radicales, exponentielles. Dérivées des quotients de fonctions, des logarithms. Études de fonctions à l'aide des dérivées premières et secondes; applications: maximums, minimums, et représentations graphiques. Concavité et points d'inflexion, la dérivée seconde. Dérivée implicite, taux reliés, optimization. Séries géométriques. Calcul intégral des fonctions d'une variable et applications. Fonctions de plusieurs variables. Dérivées partielles.

Volet : Groupe de discussion, Cours magistral

Préalable : MAT 1718 ou Fonctions avancées 4U de l'Ontario (MHF4U) ou l'équivalent. Les cours MAT 1729, MAT 1720, MAT 1721, MAT 1700, MAT 1708, MAT 1727, MAT 1730 ne peuvent être combinés pour l'obtention de crédits.

MAT 1730 Calcul différentiel et intégral pour les sciences de la vie I (3 crédits)

Dérivées: règles du produit et du quotient, dérivée de fonctions composées, dérivée des fonctions exponentielles, des fonctions logarithmiques et des fonctions trigonométriques de base, dérivées d'ordre supérieur, graphes de fonctions. Applications de la dérivée aux sciences de la vie. Systèmes dynamiques discrets, points d'équilibre, stabilité, diagramme en forme de toiles d'araignées. Intégrales: intégrales définies et indéfinies, théorème fondamental du calcul, primitives, méthodes d'intégration par substitution et par parties. Applications de l'intégrale aux sciences de la vie.

Volet : Groupe de discussion, Cours magistral

Préalable : MAT 1739 ou Mathématiques 4U de l'Ontario (MCV4U) ou l'équivalent. Les cours cours MAT 1700, MAT 1708, MAT 1720, MAT 1721, MAT 1727, MAT 1729, MAT 1730 ne peuvent être combinés pour l'obtention de crédits.

MAT 1732 Calcul différentiel et intégral pour les sciences de la vie II (3 crédits)

Intégrales: intégration numérique, intégrales impropres. Introduction aux équations différentielles, techniques pour résoudre des équations différentielles simples, solutions numériques d'équations différentielles et modélisation en sciences de la vie à l'aide d'équations différentielles. Introduction à l'algèbre linéaire: matrices et algèbre avec les matrices, déterminants, valeurs et vecteurs propres (en deux et trois dimensions). Fonctions de plusieurs variables: représentations graphiques, dérivées partielles. Systèmes d'équations différentielles: points d'équilibre, stabilité, portraits de phases et analyse globale. Pour votre information, ce cours s'adresse principalement aux étudiants et étudiantes inscrits dans les programmes des sciences de la vie. Veuillez consulter les exigences de votre programme.

Volet : Groupe de discussion, Cours magistral

Préalable : MAT 1730 ou MAT 1727. Les cours MAT 1732, MAT 1703, MAT 1722, MAT 1725 ne peuvent être combinés pour l'obtention de crédits.

MAT 1739 Introduction au calcul et vecteurs (3 crédits)

Taux de variation instantané comme limite, dérivées des polynômes en utilisant les limites, dérivées des sommes, produits, fonctions composées, dérivées des fonctions rationnelles, trigonométriques, logarithmes, et radicales. Applications: maximums, minimums, et représentations graphiques. Concavité et points d'inflexion, la dérivée seconde. Optimisation dans des modèles qui contiennent des fonctions polynômes, rationnelles, et exponentielles. Vecteurs à deux et à trois dimensions. Les formes cartésiennes, polaires, et géométriques. Opérations algébriques sur les vecteurs, produit scalaire, produit vectoriel. Applications aux projections, l'aire des parallélogrammes, le volume des parallélépipèdes. Équations de plans et de droites en forme paramétrique scalaire et vectorielle, dans l'espace à deux et à trois dimensions. Intersections de droites et de plans. Solution de jusqu'à trois équations linéaire à trois inconnues par élimination ou substitution. Interprétation géométrique des solutions. MAT 1739 est un cours de mise à niveau. Il peut être suivi à ce titre ou pour répondre d'une condition d'admission. Dans tous les cas, il ne saurait être retenu pour crédits aux fins des exigences de programmes. Noté S/NS.

Volet : Groupe de discussion, Cours magistral

Préalable : Mathématiques 4U de l'Ontario Fonctions avancées (MHF4U) ou MAT 1718 ou l'équivalent. Les cours MAT 1739, Mathématiques 4U de l'Ontario Calcul et vecteurs (MCV4U) ne peuvent être combinés pour l'obtention de crédits.

MAT 1741 Introduction à l'algèbre linéaire (3 crédits)

Revue des nombres complexes. Le théorème fondamental de l'algèbre. Revue du produit scalaire et vectoriel et des projections. Introduction aux espaces vectoriels, indépendance linéaire, bases; espaces de fonctions. Solutions des systèmes d'équations linéaires, algèbre des matrices, déterminants, valeurs et vecteurs propres. Méthode de Gram-Schmidt et projections orthogonales. Transformations linéaires, leurs noyaux, leurs images et leurs matrices associées. Applications (ex. à la géométrie, aux réseaux, aux équations différentielles).

Volet : Groupe de discussion, Cours magistral

Préalable : MAT1739 ou Mathématiques 4U de l'Ontario (MCV4U) ou l'équivalent. Les cours MAT1702, MAT1741 ne peuvent être combinés pour l'obtention de crédits.

MAT 1748 Mathématiques discrètes pour l'informatique (3 crédits)

Introduction aux structures discrètes comme base de l'informatique. Logique des propositions. Structures fondamentales: fonctions, relations, ensembles. Principes de base du dénombrement: argument de comptage, principe des tiroirs, permutations et combinaisons. Introduction aux structures d'une démonstration mathématique: directe, par l'absurde, cas par cas, par récurrence. Éléments de la théorie des graphes: isomorphisme, cycles arbres, graphes orientés. Les exemples seront principalement choisis dans le domaine de l'informatique.

Volet : Cours magistral, Groupe de discussion

Préalable : MAT 1718/Math. 4U de l'Ontario Fonctions avancées (MHF4U) ou l'équiv. Ce cours ne peut être crédité pour un étudiant qui a déjà reçu les crédits pour MAT 2748. Les cours MAT 1748, MAT 1762 ne peuvent être combinés pour l'obtention de crédits.

MAT 1762 Raisonnement mathématiques et preuves (3 crédits)

Eléments de logique, théorie des ensembles, fonctions, relations d'équivalence et cardinalité. Techniques de preuve. Les concepts sont introduits à l'aide des ensemble d'entiers naturels, entiers modulo n, nombres rationnels, réels et complexes. Exploration de la droite réelle : complétude, suprémum, suites et limites. Certains concepts seront illustrés avec des exemples venant de la géométrie, l'algèbre et la théorie des nombres.

Volet : Groupe de discussion, Cours magistral

Préalable : MAT 1739 ou Mathématiques 4U de l'Ontario Calcul et vecteurs (MCV4U) ou l'équivalent. Les cours MAT 1762 et MAT 1748 ne peuvent être combinés pour l'obtention de crédits.

MAT 1771 Statistique descriptive (3 crédits)

Des éléments de statistiques descriptives : histogrammes et diagramme à boîte et moustaches; moyenne et écart-type de l'échantillon; probabilités élémentaires; la loi normale; l'estimation statistique et tests d'hypothèses; corrélation et régression. Exemples analysés avec un logiciel statistique.

Volet : Groupe de discussion, Cours magistral

Les cours MAT1771, MAT2771, MAT2777, MAT2779 ne peuvent être combinés pour l'obtention de crédits. Ce cours ne peut pas compter pour fin de crédits dans un programme de la Faculté des sciences ou de génie.

MAT 1772 Éléments de probabilité et inférence statistique (3 crédits)

Répartitions. Loi des grands nombres et théorème limite central. Échantillonnage. Applications des probabilités. Tests avec les lois normales, t et chi-carré. Corrélation et régression.

Volet : Laboratoire, Cours magistral

Préalable : MAT 1771. Les cours MAT 1772, MAT 2771, MAT 2777, MAT 2779 ne peuvent être combinés pour l'obtention de crédits. Ce cours ne peut pas compter pour fin de crédits dans un programme de la Faculté des Sciences.

MAT 1773 Analyse des données par ordinateur (3 crédits)

Introduction à un logiciel de statistique sur ordinateur. Statistique descriptive et analyse des données par ordinateur. Les distributions et les applications des tests paramétriques et non paramétriques standards sont interprétées par simulation avec un logiciel.

Volet : Cours magistral

Les cours MAT 1773, MAT 2771, MAT 2777, MAT 2779 ne peuvent être combinés pour l'obtention de crédits. Ce cours ne peut pas compter pour fin de crédits dans un programme de la Faculté des Sciences.

MAT 1774 Probabilités et jeux de hasard : Poker 101 (3 crédits)

Une introduction à la théorie élémentaire des probabilités, la théorie des jeux, et les fondements mathématiques des jeux de hasard, démontrés par leurs applications aux jeux de poker comme le Texas Hold'em. Les aspects sociétaux du jeu.

Volet : Cours magistral

Ce cours ne peut pas être utilisé comme cours au choix en sciences pour les étudiants et étudiantes de la Faculté des sciences.

MAT 1795 La beauté des mathématiques (3 crédits)

Thèmes choisis des mathématiques modernes et anciennes. Le contenu du cours varie d'année en année. Les thèmes possibles incluent, sans s'y limiter: la géométrie classique, théorie des nombres, théorie du chaos et des mathématiques pour les enseignants dans une classe primaire. Informez-vous auprès du Département de mathématiques et statistique pour le cours de l'année actuelle.

Volet : Cours magistral

Préalable : Ce cours ne peut pas compter comme cours au choix en sciences pour les étudiants et étudiantes de la Faculté des sciences.

MAT 2122 Multivariable Calculus (3 units)

Derivatives as linear maps, the chain rule. The Clairaut-Schwarz theorem. Taylor's theorem. Implicit function theorem. Extrema, critical points. Lagrange multipliers. Double and triple integrals, Fubini's theorem, polar, spherical and cylindrical coordinates. Change of variables. Line integrals, Green's theorem. Parametric surfaces and surface integrals. Curl and Stokes's theorem, existence of potentials. Divergence and Gauss's theorem. Applications.

Course Component: Discussion Group, Lecture

Prerequisites: (MAT 1325 or MAT 1322), (MAT 1341 or CEGEP linear algebra with MAT 1341 as corequisite). The courses MAT 2122, MAT 2322 cannot be combined for units.

MAT 2125 Elementary Real Analysis (3 units)

Review of the completeness properties of real numbers. Supremum and infimum, lim sup, lim inf. The topology of R¢n. Uniform continuity. Compactness, Heine-Borel. The Riemann integral, the fundamental theorem of calculus, improper integrals. Sequences and series of functions, uniform convergence. Fourier series.

Course Component: Discussion Group, Lecture

Prerequisites: MAT1325 or MAT2122 or (MAT1322 and one of MAT1348, MAT1362, MAT2362).

MAT 2141 Honours Linear Algebra (3 units)

Vector spaces, direct sums and complement of subspaces, linear maps, representation of linear maps by matrices, dual spaces, transpose mappings, multilinear mappings, determinants, inner products, orthogonal projections, the Gram-Schmidt algorithm. Eigenvalues and eigenvectors, diagonalization of symmetric matrices. The emphasis of this course is on proving all results.

Course Component: Discussion Group, Lecture

Prerequisites: MAT1341, (MAT1348 or MAT1362 or MAT2362).

MAT 2143 Introduction to Group Theory (3 units)

Groups: Arithmetic modulo n, permutations, cyclic groups. Cosets and Lagrange’s theorem. Normal subgroups, homomorphisms, quotient groups, isomorphism theorems. Direct products and the structure theorem of finitely generated abelian groups.

Course Component: Discussion Group, Lecture

Prerequisites: MAT 1341, (MAT 1348 or MAT 1362 or MAT 2362).

MAT 2322 Calculus III for Engineers (3 units)

Extrema of functions of several variables. Multiple integration and applications. Vector fields and their derivatives. Curves. Vector differential operators. Line integrals. Surfaces and surface integrals. Theorems of Stokes, Gauss, etc.

Course Component: Lecture

Prerequisites: (MAT 1322 or MAT 1325 or MAT 1332), (MAT 1341 or CEGEP linear algebra). The courses MAT 2322, MAT 2122, MAT 2121 cannot be combined for units.

MAT 2324 Ordinary Differential Equations and the Laplace Transform (3 units)

General concepts. First order equations. Linear differential equations of higher order. Differential operators. Laplace transforms. Systems of differential equations. Series solutions about ordinary points.

Course Component: Lecture

Prerequisites: MAT 1341, (MAT 1322 or MAT 1325 or MAT 1332). The courses MAT 2324, MAT 2384 cannot be combined for units.

MAT 2342 Introduction to Applied Linear Algebra (3 units)

Review of vector spaces and matrix algebra, inner products, Gram-Schmidt, orthogonal projections. Eigenvalues and eigenvectors, diagonalization of symmetric matrices. Singular value decomposition. Applications to linear discrete dynamical systems, minimization of quadratic forms and least squares approximation, principal component analysis. Other applications chosen from: linear programming, duality and the simplex method; introduction to finite fields and coding theory.

Course Component: Lecture

Prerequisite: MAT 1302 or MAT 1341.

MAT 2348 Discrete Mathematics (3 units)

Quick review of: sets, functions, relations, induction, basic counting techniques. An in-depth treatment of recurrence relations, generating functions, and principle of inclusion-exclusion. Aspects of graph theory.

Course Component: Lecture

Prerequisites: MAT 1341, (MAT 1348 or MAT 1325 or MAT 1362 or MAT 2362 or MAT 2141).

MAT 2355 Introduction to Geometry (3 units)

Euclidean and non-Euclidean geometries; affine geometry, projective geometry. Transformations and transformation groups.

Course Component: Lecture

Prerequisite: MAT 1302 or MAT 1341.

MAT 2362 Foundations of Mathematics (3 units)

Introduction to proofs, set theory and the foundations of mathematics. Propositional logic, introduction to predicate logic and axiomatic theories. Proof techniques (direct, by contradiction, by cases, constructive and non constructive, induction). Informal set theory (sets, functions, equivalence relations, order relations). Paradoxes. Introduction to axiomatic set theory and to the encoding of mathematics. Axiom of Choice, Zorn's Lemma. Cardinality of sets.

Course Component: Discussion Group, Lecture

Prerequisites: (MAT 1322 or MAT 1325), (MAT 1341 or the CEGEP linear algebra course).

MAT 2371 Introduction to Probability (3 units)

Probability axioms and their consequences. Conditional probability and independence. Random variables, distributions and densities, moments, sampling distributions. Weak law of large numbers, sums of independent random variables, moment generating functions, convergence concepts, the central limit theorem.

Course Component: Lecture

Prerequisite: MAT 1322 or MAT 1325 or MAT 1332. The courses MAT 2371, MAT 2377, ADM 2303, ECO 3150, HSS 2381, PSY 2106 cannot be combined for units.

MAT 2375 Introduction to Statistics (3 units)

Introduction to the theory of statistical inference. Parametric point and interval estimation. Maximum likelihood estimation. Properties of estimators. Principles of hypothesis testing. Confidence intervals and tests for means and proportions (one and two sample). Introduction to linear models. Use of statistical software.

Course Component: Laboratory, Lecture

Prerequisite: MAT 2371. The courses MAT 2375, MAT 2377, MAT 2378, MAT 2379, ADM 2303, ECO 3150, HSS 2381, PSY 2106 cannot be combined for units.

MAT 2377 Probability and Statistics for Engineers (3 units)

A concise survey of: combinatorial analysis; probability and random variables; discrete and continuous densities and distribution functions; expectation and variance; normal (Gaussian), binomial and Poisson distributions; statistical estimation and hypothesis testing; method of least squares, correlation and regression. The emphasis is on statistics and quality control methods for engineers. The courses MAT 2377, MAT 1371, MAT 1372, MAT 2371, MAT 2375, MAT 2378, MAT 2379, ADM 2303, ECO 3150, HSS 2381, PSY 2106 cannot be combined for units.

Course Component: Lecture

Prerequisite: MAT 1320 or MAT 1321 or MAT 1327 or MAT 1330. The course MAT 1322 or MAT 1325 or MAT 1332 is corequisite to MAT 2377.

MAT 2379 Introduction to Biostatistics (3 units)

Descriptive statistics using a software package. A concise survey of probability. The normal distribution. The central limit theorem and statistical estimation illustrated via simulation. Hypothesis testing, the design of experiments, paired sampling, categorical data and regression. Examples from the biosciences analyzed with statistical software.

Course Component: Lecture

Prerequisite: MAT 1320 or MAT 1321 or MAT 1327 or MAT 1330. The courses MAT 2379, MAT 1371, MAT 1372, MAT 1373, MAT 2375, MAT 2377, ADM 2303, ECO 3150, HSS 2381, PSY 2106 cannot be combined for units.

MAT 2384 Ordinary Differential Equations and Numerical Methods (3 units)

General concepts. First order equations. Linear differential equations of higher order. Differential operators. Laplace transforms. Systems of differential equations. Series solutions about ordinary points. Numerical methods including error analysis; numerical differentiation, integration and solutions of differential equations.

Course Component: Lecture

Prerequisites: MAT 1341, (MAT 1322 or MAT 1325 or MAT 1332). The courses MAT 2384, MAT 2324 cannot be combined for units.`
  const course = parseCourses(coursesString);
  console.log(course);
  return course
}