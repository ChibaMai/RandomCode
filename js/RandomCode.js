// 获取所有元素
let selectOption = $("#ss_cd");
let generate = $("#generate");
let result = $("#result");
let CalculatedLength = $("#CalculatedLength");
let copy = $("#copy");
let success = $("#success");

let options = {
  capital: true,
  lowerCase: true,  
  number: true,
  symbol: false,
  selectValue: 16,
  passwords: '',
};

// 随机对象
const randomFunc = {
  capital: getRandomLowerCase,
  lowerCase: getRandomUpperCase,
  number: getRandomNumber,
  symbol: getRandomSymbol
}

// 密码
let password = {
  symbol: ['!', '@', '#', '$', '%', '^', '&', '*', '~', '?', '`', '+', '=', '_', '-']
}

selectOptionvalue(selectOption, 1, 99, 16);
selectValue(selectOption);
randomDesktopBackground(200);

// 获取 字符设置 options 状态
$("#characters-used").click(e => {
  if (e.target.nodeName === "INPUT") {
    let state = $(e.target).is(':checked');
    let nameId = $(e.target).attr('id');

    for (const key in options) {
      if (nameId === key) {
        options[key] = state
      }
    }
  }
});

// 添加点击事件
$(generate).click(function () {
  let data = generatePassword(
    options.capital,
    options.lowerCase,
    options.number,
    options.symbol,
    options.selectValue
  );

  $(result).val(data);
  $(CalculatedLength).html(`密码长度为: ${data.length}`);
  // 显示复制按钮
  $(copy).fadeIn(380);
  // 将密码返回到 options 中
  options.passwords = data;
  // 切换随机背景
  // randomDesktopBackground(200);
});

// 复制功能
$(copy).click(function () {
  result[0].select();
  document.execCommand("copy");
  $(success).stop().fadeIn(380);

  // 500 毫秒后移除提示信息
  setTimeout(() => {
    $(success).stop().fadeOut(380);
  }, 1000);
});

// 随机桌面背景
function randomDesktopBackground(num) {
  let n = Math.floor(Math.random() * num);
  $("body").css({
    backgroundImage: `url('https://yangzj1992-1251901721.cos.ap-beijing.myqcloud.com/images/TKL/wall-${n}.jpg')`,
  });
}

/**
 * 初始密码
 * @param {*} lower 
 * @param {*} upper 
 * @param {*} number 
 * @param {*} symbol 
 * @param {*} length 
 */
function generatePassword(capital, lowerCase, number, symbol, length) {
  let generatedPassword = "";
  let typesCount = capital + lowerCase + number + symbol;
  const typesArr = [{ capital }, { lowerCase }, { number }, { symbol }].filter(item => Object.values(item)[0]);

  if (typesCount === 0) {
		return ""
  }

  for (let i = 0; i < length; i++) {
    typesArr.forEach(function (type) {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }
  
  return generatedPassword.slice(0, length);
}

// 随机生成小写字符
function getRandomLowerCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

// 随机生成大写字符
function getRandomUpperCase() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

// 随机生成数值符
function getRandomNumber() {
	return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

// 获取随机符合
function getRandomSymbol() {
	return password.symbol[Math.floor(Math.random() * password.symbol.length)];
}

// select 多选框选择的数值
function selectValue(el) {
  $(el).click(e => {
    options.selectValue = $('#ss_cd option:selected').text();

    return options.selectValue
  });
}

/**
 * 生成选择密码长度
 * @param {el} 写入的元素
 * @param {startingValue} 开始循环的数值
 * @param {endValue} 结束循环的数值
 * @param {defaults} 设置默认值
 * @returns 仅限 <option value="1">1</option> 模式使用
 */
function selectOptionvalue(el, startingValue, endValue, defaults) {
  let html = '';
  
  // <option value="1">1</option>
  for (let i = startingValue; i <= endValue; i++){
    html += `<option value="${i}">${i}</option>`;
  }
  
  el[0].innerHTML = html;

  // 设置默认值
  $(`option[value='${defaults}']`).prop("selected",true);

  return html;
}
