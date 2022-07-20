const g_list = {
	init: function(){
		let self = this;
		this.data = local_readJson('list', {
			1: {
				text: '欢迎所有刚进直播间的宝宝，看一下下方小黄车链接!',
			},
			2: {
				text: '今天新号开播!新号开播!',
			},
			3: {
				text: '下方小黄车，任何一个链接都可以拍下自己喜欢的零食，价格超底，给你们包邮送到家的哈!',
			},
			4: {
				text: '因为主播是在拉数据拉流量，所以亏米让你们拍，想要的抓紧去拍，抓紧去抢!',
			},
			5: {
				text: '活动库存有限!拼手速拼网速啦，抢到就是赚到!这么便宜的价格外面肯定没有的',
			},
			6: {
				text: '今天刷到主播直播间的宝子们，主播给你们人手备注一单，还给你们包邮到家，抢到就是赚到!',
			},
			7: {
				text: '所以抓紧拍，抓紧抢，拍到的回来公屏上打拍到，想要加急的打加急，加急的主播24 小时内给你们发货!收到货一定要联系客服，给你们奉上大惊喜!',
			},
			8: {
				text: '欢迎大家们来到我的直播间，希望朋友们多多支持，多多捧场哦！',
			},
			9: {
				text: '不用想，直接拍，只有我们这里有这样的价格，往后只会越来越贵',
			},
			10: {
				text: '今天只限在我的直播间有这个价格，站外都没有这个价格',
			},
			11: {
				text: '今天的优惠数量有限，只有200个,只有200个，抢完为止，抢完为止',
			},
			12: {
				text: '欢迎进来的朋友，不要着急马上走，点点关注不迷路，主播带你上高速。',
			},
			13: {
				text: '给你们包邮送到家，9.9连运费都不够了',
			},
			14: {
				text: '抢到的扣抢到需要加急的，点关注扣加急，优先安排给你们打包。优先发货！',
			},
			15: {
				text: '新来的宝宝我看到你了，欢迎你来到我们直播间，喜欢主播的点个关注哦！',
			},
			16: {
				text: '宝宝们如果有不清楚拍什么的可以把你们的疑问打出来!',
			},
			17: {
				text: '我们之前试播的时候，这个产品一上架就秒空了，超级抢手，所以进来宝宝千万不要犹豫，下单就行了!',
			},
			18: {
				text: '这款产品数量有限，如果看中了一定要及时下单，不然等会儿就抢不到了哦。',
			},
			19: {
				text: '抢到就是赚到、秒杀单品数量有限，先付先得、最后2分钟！最后2分钟!',
			},
			20: {
				text: '欢迎所有刚进直播间的宝宝，看一下下方小黄车链接!',
			},
			1: {
				text: '欢迎所有刚进直播间的宝宝，看一下下方小黄车链接!',
			},
			1: {
				text: '欢迎所有刚进直播间的宝宝，看一下下方小黄车链接!',
			},
			1: {
				text: '欢迎所有刚进直播间的宝宝，看一下下方小黄车链接!',
			},
			1: {
				text: '欢迎所有刚进直播间的宝宝，看一下下方小黄车链接!',
			},
			1: {
				text: '欢迎所有刚进直播间的宝宝，看一下下方小黄车链接!',
			},
			1: {
				text: '欢迎所有刚进直播间的宝宝，看一下下方小黄车链接!',
			},
			1: {
				text: '欢迎所有刚进直播间的宝宝，看一下下方小黄车链接!',
			},
			1: {
				text: '欢迎所有刚进直播间的宝宝，看一下下方小黄车链接!',
			},
			1: {
				text: '欢迎所有刚进直播间的宝宝，看一下下方小黄车链接!',
			},
			1: {
				text: '欢迎所有刚进直播间的宝宝，看一下下方小黄车链接!',
			},
			1: {
				text: '欢迎所有刚进直播间的宝宝，看一下下方小黄车链接!',
			},
			1: {
				text: '欢迎所有刚进直播间的宝宝，看一下下方小黄车链接!',
			},
			1: {
				text: '欢迎所有刚进直播间的宝宝，看一下下方小黄车链接!',
			},
			1: {
				text: '欢迎所有刚进直播间的宝宝，看一下下方小黄车链接!',
			},
			1: {
				text: '欢迎所有刚进直播间的宝宝，看一下下方小黄车链接!',
			},
		})
		registerAction('list', dom => {
			let h = '<ul class="list-group">';
			let tags = [].concat(this.tags);
			tags.push('默认')
			for(let tag of tags){
				h+=`
					<li class="list-group-item" data-action="toggleClass,active" data-tag="${tag}">
						${tag}
					</li>
				`
			}
			confirm(h+'</ul>', {
				id: 'modal_list',
				title: '列表',
				callback: id => {
					if(id == 'ok'){
						let name = $('#modal_list li.active').data('tag');
						if(!isEmpty(name)){
							g_list.tag_load(name);
						}
					}
				}
			})
		})
		registerAction('nextItem', (dom, action) => {
			self.next();
		})
		registerAction('toggleClass', (dom, action) => {
			$(dom).parents().find('.'+action[1]).removeClass(action[1])
			$(dom).addClass(action[1]);
		})
		g_list.load();
		g_list.tag_load('a');
		// doAction(null, 'list')
	},

	load: function(){
		let h = '';
		let tags = [];
		for(let [id, v] of Object.entries(this.data)){
			if(!v.tags) continue;
			for(let tag of v.tags){
				if(!tags.includes(tag)) tags.push(tag);
				h += `

				`
			}
		}
		this.tags = tags;
	},

	tag_load: function(tag){
		this.current = tag;
		this.currentList = this.tag_keys(tag);
		this.nextTick = 0;
		this.next();
		/*clearInterval(this.timer);
		this.timer = setInterval(() => {
			let progress = ++this.nextTick / 5 * 100
   			 $('.progress').show().find('.progress-bar').css('width', progress+'%')
			if(progress >= 100){
				this.next();
			}
		}, 1000)*/
	},

	next: function(){
		this.nextTick = 0;
		let i = randNum(0, this.currentList.length - 1);
		this.show_item(this.currentList[i])
	},

	show_item: function(id){
		this.currentId = id;
		let item = this.data[id];
		console.log(item);
		$('h1').html(item.text)
	},

	tag_keys: function(tags){
		let ids = new Set();
		for(let [id, v] of Object.entries(this.data)){
			if(!v.tags){
				if(tags == '默认') ids.add(id)
				continue;
			}
			let index = v.tags.findIndex(tag)
			if(index != -1) ids.add(id)
		}
		return Array.from(ids);
	},
}

g_list.init();