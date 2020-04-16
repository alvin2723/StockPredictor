<script>
  function crossover(kromosom) {
    var COB = 0.25; //CrossOverProbability
    var position = [];
    var count = 0;
    for (i = 0; i < kromosom[0].length; i++) {
      var rand = Math.random();
      if (rand < COB) {
        position[count] = i;
        count++;
      }
    }
    console.log("POS : " + position);

    var COP = []; //CrossOverPosition
    for (i = 0; i < count; i++) {
      COP[i] = Math.floor(Math.random() * kromosom[0].length) + 1;
      console.log("COP " + i + " => " + COP[i]);
    }

    var offSpring = [];
    var temp = kromosom[position[0]];
    for (i = 0; i < count; i++) {
      if (i == count - 1) {
        //   offSpring[position[i]] = kromosom[position[i]].slice(0, COP[i]).concat(kromosom[position[0]].slice(COP[0], kromosom[0].length));
        offSpring[position[i]] = kromosom[position[i]]
          .slice(0, COP[i])
          .concat(temp.slice(COP[i], temp.length));
        console.log(COP[i]);
      } else {
        //   offSpring[position[i]] = kromosom[position[i]].slice(0, COP[i]).concat(kromosom[position[i + 1]].slice(COP[i + 1], kromosom[0].length));
        offSpring[position[i]] = kromosom[position[i]]
          .slice(0, COP[i])
          .concat(
            kromosom[position[i + 1]].slice(COP[i + 1], kromosom[0].length)
          );

        // offSpring[position[i]] = kromosom[position[i]];
        console.log(COP[i]);
      }
    }

    for (i = 0; i < count; i++) {
      var pos = position[i]
      var now = kromosom[i]
      var next = kromosom[(i+1)%kromosom.length]
      for(j = 0; j < 5; j++) {
        if(j < COP[i]) {
          offSpring[i].push(now[j])
        } else {
          offSpring[i].push(next[j])
        }
      }
      console.log('Index i ' + offSpring[i])
    }

    var new_chromosome = [];
    for (i = 0; i < kromosom.length; i++) {
      if (i == position[i]) {
        new_chromosome[i] = offSpring[i];
      } else {
        new_chromosome[i] = kromosom[i];
      }
    }

    return new_chromosome;
  }

  function mutation(kromosom) {
    var MR = 0.1;
    var total = kromosom.length;
    var totalGen = kromosom.length * 5;
    var jumlahMutasi = Math.floor(MR * totalGen);
    var done = new Array(totalGen + 5);
    var genMutasi = [];

    while (jumlahMutasi--) {
      var rand = Math.floor(Math.random() * totalGen) + 1;
      if (done[rand] == 1) {
        jumlahMutasi++;
      } else {
        done[rand] = 1;
        genMutasi.push(rand);
      }
    }
    //rulseny SMA(10) ama SMA(30) dibandingin lalu kalo nilai SMA(10day) == SMA(30day), liat nilai SMA(10 day). Klo nilai lbh tinggi dr pd yg sm itu, jdny bakal naik. kalo nilai lbh rendah jd bakal turun, EMA carany sama, MACD sama,
    var size = genMutasi.length;
    mutated = new Array(size + 5);
    for (var i = 0; i < size; i++) {
      mutated[i] = [];
    }

    for (i = 0; i < size; i++) {
      // kromosom[genMutasi[i]/5][genMutasi[i]%5] = Math.random();
      var row = genMutasi[i] / 5;
      var col = genMutasi[i] % 5;
      mutated[row].push(col);
    }
    for (i = 0; i < total; i++) {
      if (mutated[i].length < 2) continue;
      var sum = 0;
      var sumRand = 0;
      for (j = 0; j < mutated[i].length; j++) {
        var rand = Math.floor(Math.random() * 100);
        sumRand += rand;
        sum += kromosom[i][mutated[i][j]];
        kromosom[i][mutated[i][j]] = rand;
      }
      for (j = 0; j < mutated[i].length; j++) {
        kromosom[i][mutated[i][j]] /= sumRand;
        kromosom[i][mutated[i][j]] *= sum;
      }
    }

    return kromosom;
  }

  function test(kromosom) {
    return kromosom[0].length;
  }

  var arr = [
    [1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2],
    [3, 3, 3, 3, 3],
    [4, 4, 4, 4, 4],
  ];
  document.write(arr);
  document.write("<br>");

  arr = crossover(arr);
  document.write(arr);
</script>
