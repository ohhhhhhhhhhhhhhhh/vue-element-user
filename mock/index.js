// 使用Mock
const Mock = require('mockjs')
Mock.setup({
  timeout: '50-200'
})

// 表格信息
const tableData = [
                        {
                            type: "到户联系",
                            volunteer: "海绵宝宝",
                            villager: "章鱼哥",
							district: '保靖县/*乡/A村',
							detail: {
								'photo': [
									"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.cdsfl.org.cn%2Fuploadfile%2F2017%2F0518%2F20170518092943459.jpg&refer=http%3A%2F%2Fwww.cdsfl.org.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630576268&t=e74980b8841d2724817aac02265cee1b",
									"https://img0.baidu.com/it/u=3615372845,2857033766&fm=26&fmt=auto&gp=0.jpg",
									"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx3.sinaimg.cn%2Flarge%2F007CIlnsly1gsy2f5ecpyj312w0px7bm.jpg&refer=http%3A%2F%2Fwx3.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630576769&t=a79e037ed5dc29eb48f08d6cabfce17a",
									'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
									          'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
									          'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
									          'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
									          'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
									          'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg'
									],
								'content': "“老人家您好，在洗菜啊，我是您的帮扶人可记得了，上次我和年富书记一起来的”，我看到老人在洗菜就大声的喊他（老人快80了，听力不太好）。松贵老人看到我来，连忙放下了手中的菜，激动的走了过来，“哦、哦、呵…”（老人说话已经很吃力了），我虽没听懂老人说什么，但从他挥动的手势，知道这是在叫我到堂前坐坐。因为残疾的缘故，老人走路一波一瘸，我赶紧上去搀扶。我认真询问了老人这一个月来的生活情况，在问到老人儿子的情况时，松贵老人像打开的话夹，兴奋的跟我介绍起他的儿子（老人儿子在浙江打工，一年回来次数很少），不过说着说着，老人情绪渐渐激动了，将手搭在我的手背上，眼睛湿润了起来，抽咽的和我说到“感谢啊、你们好，没有你们帮助，我一个人日子怎么过，每天吃的菜都是邻居给的….”。老人将我当亲人一样，聊着他生活中的酸、甜、苦、辣，我真想多陪老人一会，估计平日里很少有人会陪老人聊天，可是还有很多事情，我不得不跟老人告别了。临走时，我告诉老人重度残疾护理补贴已经帮他申请了，老人听后很高兴，并坚持要送我出门，我示意老人不用了。不过当我走上马路，回头时发现老人还是走到门口，默默看着我离开的方向。想起老人感激的话语，我感到十分惭愧，老人将我们当成了他的亲人，而我们给予老人的关心还远远达不到亲人的要求。",
								'famType': '留守儿童户',
								'date': '2021-07-12'
							}
                        },
                        {
                            type: "民情走访",
                            volunteer: "派大星",
                            villager: "海绵宝宝",
                        	district: '保靖县/*乡/B村',
							detail: {
								'photo': [
									"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.cdsfl.org.cn%2Fuploadfile%2F2017%2F0518%2F20170518092943459.jpg&refer=http%3A%2F%2Fwww.cdsfl.org.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630576268&t=e74980b8841d2724817aac02265cee1b",
									"https://img0.baidu.com/it/u=3615372845,2857033766&fm=26&fmt=auto&gp=0.jpg",
									"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx3.sinaimg.cn%2Flarge%2F007CIlnsly1gsy2f5ecpyj312w0px7bm.jpg&refer=http%3A%2F%2Fwx3.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630576769&t=a79e037ed5dc29eb48f08d6cabfce17a",
									'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
									],
								'content': "“老人家您好，在洗菜啊，我是您的帮扶人可记得了，上次我和年富书记一起来的”，我看到老人在洗菜就大声的喊他（老人快80了，听力不太好）。松贵老人看到我来，连忙放下了手中的菜，激动的走了过来，“哦、哦、呵…”（老人说话已经很吃力了），我虽没听懂老人说什么，但从他挥动的手势，知道这是在叫我到堂前坐坐。因为残疾的缘故，老人走路一波一瘸，我赶紧上去搀扶。我认真询问了老人这一个月来的生活情况，在问到老人儿子的情况时，松贵老人像打开的话夹，兴奋的跟我介绍起他的儿子（老人儿子在浙江打工，一年回来次数很少），不过说着说着，老人情绪渐渐激动了，将手搭在我的手背上，眼睛湿润了起来，抽咽的和我说到“感谢啊、你们好，没有你们帮助，我一个人日子怎么过，每天吃的菜都是邻居给的….”。老人将我当亲人一样，聊着他生活中的酸、甜、苦、辣，我真想多陪老人一会，估计平日里很少有人会陪老人聊天，可是还有很多事情，我不得不跟老人告别了。临走时，我告诉老人重度残疾护理补贴已经帮他申请了，老人听后很高兴，并坚持要送我出门，我示意老人不用了。不过当我走上马路，回头时发现老人还是走到门口，默默看着我离开的方向。想起老人感激的话语，我感到十分惭愧，老人将我们当成了他的亲人，而我们给予老人的关心还远远达不到亲人的要求。",
								'famType': '留守儿童户',
								'date': '2021-07-12'
							}
                        },
						{
						    type: "政策落实",
						    volunteer: "小蜗",
						    villager: "派大星",
							district: '保靖县/*乡/B村',
							detail: {
								'photo': [
									"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.cdsfl.org.cn%2Fuploadfile%2F2017%2F0518%2F20170518092943459.jpg&refer=http%3A%2F%2Fwww.cdsfl.org.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630576268&t=e74980b8841d2724817aac02265cee1b",
									"https://img0.baidu.com/it/u=3615372845,2857033766&fm=26&fmt=auto&gp=0.jpg",
									"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx3.sinaimg.cn%2Flarge%2F007CIlnsly1gsy2f5ecpyj312w0px7bm.jpg&refer=http%3A%2F%2Fwx3.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630576769&t=a79e037ed5dc29eb48f08d6cabfce17a",
									'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
									],
								'content': "“老人家您好，在洗菜啊，我是您的帮扶人可记得了，上次我和年富书记一起来的”，我看到老人在洗菜就大声的喊他（老人快80了，听力不太好）。松贵老人看到我来，连忙放下了手中的菜，激动的走了过来，“哦、哦、呵…”（老人说话已经很吃力了），我虽没听懂老人说什么，但从他挥动的手势，知道这是在叫我到堂前坐坐。因为残疾的缘故，老人走路一波一瘸，我赶紧上去搀扶。我认真询问了老人这一个月来的生活情况，在问到老人儿子的情况时，松贵老人像打开的话夹，兴奋的跟我介绍起他的儿子（老人儿子在浙江打工，一年回来次数很少），不过说着说着，老人情绪渐渐激动了，将手搭在我的手背上，眼睛湿润了起来，抽咽的和我说到“感谢啊、你们好，没有你们帮助，我一个人日子怎么过，每天吃的菜都是邻居给的….”。老人将我当亲人一样，聊着他生活中的酸、甜、苦、辣，我真想多陪老人一会，估计平日里很少有人会陪老人聊天，可是还有很多事情，我不得不跟老人告别了。临走时，我告诉老人重度残疾护理补贴已经帮他申请了，老人听后很高兴，并坚持要送我出门，我示意老人不用了。不过当我走上马路，回头时发现老人还是走到门口，默默看着我离开的方向。想起老人感激的话语，我感到十分惭愧，老人将我们当成了他的亲人，而我们给予老人的关心还远远达不到亲人的要求。",
								'famType': '留守儿童户',
								'date': '2021-07-12'
							}
						},
						{
						    type: "精准服务",
						    volunteer: "海绵宝宝",
						    villager: "章鱼哥",
							district: '保靖县/*乡/A村',
							detail: {
								'photo': [
									"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.cdsfl.org.cn%2Fuploadfile%2F2017%2F0518%2F20170518092943459.jpg&refer=http%3A%2F%2Fwww.cdsfl.org.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630576268&t=e74980b8841d2724817aac02265cee1b",
									"https://img0.baidu.com/it/u=3615372845,2857033766&fm=26&fmt=auto&gp=0.jpg",
									"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx3.sinaimg.cn%2Flarge%2F007CIlnsly1gsy2f5ecpyj312w0px7bm.jpg&refer=http%3A%2F%2Fwx3.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630576769&t=a79e037ed5dc29eb48f08d6cabfce17a",
									'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
									],
								'content': "“老人家您好，在洗菜啊，我是您的帮扶人可记得了，上次我和年富书记一起来的”，我看到老人在洗菜就大声的喊他（老人快80了，听力不太好）。松贵老人看到我来，连忙放下了手中的菜，激动的走了过来，“哦、哦、呵…”（老人说话已经很吃力了），我虽没听懂老人说什么，但从他挥动的手势，知道这是在叫我到堂前坐坐。因为残疾的缘故，老人走路一波一瘸，我赶紧上去搀扶。我认真询问了老人这一个月来的生活情况，在问到老人儿子的情况时，松贵老人像打开的话夹，兴奋的跟我介绍起他的儿子（老人儿子在浙江打工，一年回来次数很少），不过说着说着，老人情绪渐渐激动了，将手搭在我的手背上，眼睛湿润了起来，抽咽的和我说到“感谢啊、你们好，没有你们帮助，我一个人日子怎么过，每天吃的菜都是邻居给的….”。老人将我当亲人一样，聊着他生活中的酸、甜、苦、辣，我真想多陪老人一会，估计平日里很少有人会陪老人聊天，可是还有很多事情，我不得不跟老人告别了。临走时，我告诉老人重度残疾护理补贴已经帮他申请了，老人听后很高兴，并坚持要送我出门，我示意老人不用了。不过当我走上马路，回头时发现老人还是走到门口，默默看着我离开的方向。想起老人感激的话语，我感到十分惭愧，老人将我们当成了他的亲人，而我们给予老人的关心还远远达不到亲人的要求。",
								'famType': '留守儿童户',
								'date': '2021-07-12'
							}
						},
						{
						    type: "产业对接",
						    volunteer: "派大星",
						    villager: "海绵宝宝",
							district: '保靖县/*乡/C村',
							detail: {
								'photo': [
									"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.cdsfl.org.cn%2Fuploadfile%2F2017%2F0518%2F20170518092943459.jpg&refer=http%3A%2F%2Fwww.cdsfl.org.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630576268&t=e74980b8841d2724817aac02265cee1b",
									"https://img0.baidu.com/it/u=3615372845,2857033766&fm=26&fmt=auto&gp=0.jpg",
									"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx3.sinaimg.cn%2Flarge%2F007CIlnsly1gsy2f5ecpyj312w0px7bm.jpg&refer=http%3A%2F%2Fwx3.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630576769&t=a79e037ed5dc29eb48f08d6cabfce17a",
									'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
									],
								'content': "“老人家您好，在洗菜啊，我是您的帮扶人可记得了，上次我和年富书记一起来的”，我看到老人在洗菜就大声的喊他（老人快80了，听力不太好）。松贵老人看到我来，连忙放下了手中的菜，激动的走了过来，“哦、哦、呵…”（老人说话已经很吃力了），我虽没听懂老人说什么，但从他挥动的手势，知道这是在叫我到堂前坐坐。因为残疾的缘故，老人走路一波一瘸，我赶紧上去搀扶。我认真询问了老人这一个月来的生活情况，在问到老人儿子的情况时，松贵老人像打开的话夹，兴奋的跟我介绍起他的儿子（老人儿子在浙江打工，一年回来次数很少），不过说着说着，老人情绪渐渐激动了，将手搭在我的手背上，眼睛湿润了起来，抽咽的和我说到“感谢啊、你们好，没有你们帮助，我一个人日子怎么过，每天吃的菜都是邻居给的….”。老人将我当亲人一样，聊着他生活中的酸、甜、苦、辣，我真想多陪老人一会，估计平日里很少有人会陪老人聊天，可是还有很多事情，我不得不跟老人告别了。临走时，我告诉老人重度残疾护理补贴已经帮他申请了，老人听后很高兴，并坚持要送我出门，我示意老人不用了。不过当我走上马路，回头时发现老人还是走到门口，默默看着我离开的方向。想起老人感激的话语，我感到十分惭愧，老人将我们当成了他的亲人，而我们给予老人的关心还远远达不到亲人的要求。",
								'famType': '留守儿童户',
								'date': '2021-07-12'
							}
						},
						{
						    type: "到户联系",
						    volunteer: "章鱼哥",
						    villager: "天线宝宝",
							district: '保靖县/*乡/D村',
							detail: {
								'photo': [
									"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.cdsfl.org.cn%2Fuploadfile%2F2017%2F0518%2F20170518092943459.jpg&refer=http%3A%2F%2Fwww.cdsfl.org.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630576268&t=e74980b8841d2724817aac02265cee1b",
									"https://img0.baidu.com/it/u=3615372845,2857033766&fm=26&fmt=auto&gp=0.jpg",
									"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx3.sinaimg.cn%2Flarge%2F007CIlnsly1gsy2f5ecpyj312w0px7bm.jpg&refer=http%3A%2F%2Fwx3.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630576769&t=a79e037ed5dc29eb48f08d6cabfce17a",
									'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
									],
								'content': "“老人家您好，在洗菜啊，我是您的帮扶人可记得了，上次我和年富书记一起来的”，我看到老人在洗菜就大声的喊他（老人快80了，听力不太好）。松贵老人看到我来，连忙放下了手中的菜，激动的走了过来，“哦、哦、呵…”（老人说话已经很吃力了），我虽没听懂老人说什么，但从他挥动的手势，知道这是在叫我到堂前坐坐。因为残疾的缘故，老人走路一波一瘸，我赶紧上去搀扶。我认真询问了老人这一个月来的生活情况，在问到老人儿子的情况时，松贵老人像打开的话夹，兴奋的跟我介绍起他的儿子（老人儿子在浙江打工，一年回来次数很少），不过说着说着，老人情绪渐渐激动了，将手搭在我的手背上，眼睛湿润了起来，抽咽的和我说到“感谢啊、你们好，没有你们帮助，我一个人日子怎么过，每天吃的菜都是邻居给的….”。老人将我当亲人一样，聊着他生活中的酸、甜、苦、辣，我真想多陪老人一会，估计平日里很少有人会陪老人聊天，可是还有很多事情，我不得不跟老人告别了。临走时，我告诉老人重度残疾护理补贴已经帮他申请了，老人听后很高兴，并坚持要送我出门，我示意老人不用了。不过当我走上马路，回头时发现老人还是走到门口，默默看着我离开的方向。想起老人感激的话语，我感到十分惭愧，老人将我们当成了他的亲人，而我们给予老人的关心还远远达不到亲人的要求。",
								'famType': '留守儿童户',
								'date': '2021-07-12'
							}
						},
						{
						    type: "民情走访",
						    volunteer: "蟹老板",
						    villager: "花园宝宝",
							district: '保靖县/*乡/C村',
							detail: {
								'photo': [
									"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.cdsfl.org.cn%2Fuploadfile%2F2017%2F0518%2F20170518092943459.jpg&refer=http%3A%2F%2Fwww.cdsfl.org.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630576268&t=e74980b8841d2724817aac02265cee1b",
									"https://img0.baidu.com/it/u=3615372845,2857033766&fm=26&fmt=auto&gp=0.jpg",
									"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx3.sinaimg.cn%2Flarge%2F007CIlnsly1gsy2f5ecpyj312w0px7bm.jpg&refer=http%3A%2F%2Fwx3.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630576769&t=a79e037ed5dc29eb48f08d6cabfce17a",
									'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
									],
								'content': "“老人家您好，在洗菜啊，我是您的帮扶人可记得了，上次我和年富书记一起来的”，我看到老人在洗菜就大声的喊他（老人快80了，听力不太好）。松贵老人看到我来，连忙放下了手中的菜，激动的走了过来，“哦、哦、呵…”（老人说话已经很吃力了），我虽没听懂老人说什么，但从他挥动的手势，知道这是在叫我到堂前坐坐。因为残疾的缘故，老人走路一波一瘸，我赶紧上去搀扶。我认真询问了老人这一个月来的生活情况，在问到老人儿子的情况时，松贵老人像打开的话夹，兴奋的跟我介绍起他的儿子（老人儿子在浙江打工，一年回来次数很少），不过说着说着，老人情绪渐渐激动了，将手搭在我的手背上，眼睛湿润了起来，抽咽的和我说到“感谢啊、你们好，没有你们帮助，我一个人日子怎么过，每天吃的菜都是邻居给的….”。老人将我当亲人一样，聊着他生活中的酸、甜、苦、辣，我真想多陪老人一会，估计平日里很少有人会陪老人聊天，可是还有很多事情，我不得不跟老人告别了。临走时，我告诉老人重度残疾护理补贴已经帮他申请了，老人听后很高兴，并坚持要送我出门，我示意老人不用了。不过当我走上马路，回头时发现老人还是走到门口，默默看着我离开的方向。想起老人感激的话语，我感到十分惭愧，老人将我们当成了他的亲人，而我们给予老人的关心还远远达不到亲人的要求。",
								'famType': '留守儿童户',
								'date': '2021-07-12'
							}
						},
						{
						    type: "到户联系",
						    volunteer: "蟹黄堡",
						    villager: "海绵宝宝",
							district: '保靖县/*乡/D村',
							detail: {
								'photo': [
									"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.cdsfl.org.cn%2Fuploadfile%2F2017%2F0518%2F20170518092943459.jpg&refer=http%3A%2F%2Fwww.cdsfl.org.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630576268&t=e74980b8841d2724817aac02265cee1b",
									"https://img0.baidu.com/it/u=3615372845,2857033766&fm=26&fmt=auto&gp=0.jpg",
									"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx3.sinaimg.cn%2Flarge%2F007CIlnsly1gsy2f5ecpyj312w0px7bm.jpg&refer=http%3A%2F%2Fwx3.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630576769&t=a79e037ed5dc29eb48f08d6cabfce17a",
									'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
									],
								'content': "“老人家您好，在洗菜啊，我是您的帮扶人可记得了，上次我和年富书记一起来的”，我看到老人在洗菜就大声的喊他（老人快80了，听力不太好）。松贵老人看到我来，连忙放下了手中的菜，激动的走了过来，“哦、哦、呵…”（老人说话已经很吃力了），我虽没听懂老人说什么，但从他挥动的手势，知道这是在叫我到堂前坐坐。因为残疾的缘故，老人走路一波一瘸，我赶紧上去搀扶。我认真询问了老人这一个月来的生活情况，在问到老人儿子的情况时，松贵老人像打开的话夹，兴奋的跟我介绍起他的儿子（老人儿子在浙江打工，一年回来次数很少），不过说着说着，老人情绪渐渐激动了，将手搭在我的手背上，眼睛湿润了起来，抽咽的和我说到“感谢啊、你们好，没有你们帮助，我一个人日子怎么过，每天吃的菜都是邻居给的….”。老人将我当亲人一样，聊着他生活中的酸、甜、苦、辣，我真想多陪老人一会，估计平日里很少有人会陪老人聊天，可是还有很多事情，我不得不跟老人告别了。临走时，我告诉老人重度残疾护理补贴已经帮他申请了，老人听后很高兴，并坚持要送我出门，我示意老人不用了。不过当我走上马路，回头时发现老人还是走到门口，默默看着我离开的方向。想起老人感激的话语，我感到十分惭愧，老人将我们当成了他的亲人，而我们给予老人的关心还远远达不到亲人的要求。",
								'famType': '留守儿童户',
								'date': '2021-07-12'
							}
						},
						{
						    type: "到户联系",
						    volunteer: "章鱼哥",
						    villager: "派大星",
							district: '保靖县/*乡/A村',
							detail: {
								'photo': [
									"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.cdsfl.org.cn%2Fuploadfile%2F2017%2F0518%2F20170518092943459.jpg&refer=http%3A%2F%2Fwww.cdsfl.org.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630576268&t=e74980b8841d2724817aac02265cee1b",
									"https://img0.baidu.com/it/u=3615372845,2857033766&fm=26&fmt=auto&gp=0.jpg",
									"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx3.sinaimg.cn%2Flarge%2F007CIlnsly1gsy2f5ecpyj312w0px7bm.jpg&refer=http%3A%2F%2Fwx3.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630576769&t=a79e037ed5dc29eb48f08d6cabfce17a",
									'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
									],
								'content': "“老人家您好，在洗菜啊，我是您的帮扶人可记得了，上次我和年富书记一起来的”，我看到老人在洗菜就大声的喊他（老人快80了，听力不太好）。松贵老人看到我来，连忙放下了手中的菜，激动的走了过来，“哦、哦、呵…”（老人说话已经很吃力了），我虽没听懂老人说什么，但从他挥动的手势，知道这是在叫我到堂前坐坐。因为残疾的缘故，老人走路一波一瘸，我赶紧上去搀扶。我认真询问了老人这一个月来的生活情况，在问到老人儿子的情况时，松贵老人像打开的话夹，兴奋的跟我介绍起他的儿子（老人儿子在浙江打工，一年回来次数很少），不过说着说着，老人情绪渐渐激动了，将手搭在我的手背上，眼睛湿润了起来，抽咽的和我说到“感谢啊、你们好，没有你们帮助，我一个人日子怎么过，每天吃的菜都是邻居给的….”。老人将我当亲人一样，聊着他生活中的酸、甜、苦、辣，我真想多陪老人一会，估计平日里很少有人会陪老人聊天，可是还有很多事情，我不得不跟老人告别了。临走时，我告诉老人重度残疾护理补贴已经帮他申请了，老人听后很高兴，并坚持要送我出门，我示意老人不用了。不过当我走上马路，回头时发现老人还是走到门口，默默看着我离开的方向。想起老人感激的话语，我感到十分惭愧，老人将我们当成了他的亲人，而我们给予老人的关心还远远达不到亲人的要求。",
								'famType': '留守儿童户',
								'date': '2021-07-12'
							}
						},
						{
						    type: "到户联系",
						    volunteer: "海绵宝宝",
						    villager: "小蜗",
							district: '保靖县/*乡/A村',
							detail: {
								'photo': [
									"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.cdsfl.org.cn%2Fuploadfile%2F2017%2F0518%2F20170518092943459.jpg&refer=http%3A%2F%2Fwww.cdsfl.org.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630576268&t=e74980b8841d2724817aac02265cee1b",
									"https://img0.baidu.com/it/u=3615372845,2857033766&fm=26&fmt=auto&gp=0.jpg",
									"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx3.sinaimg.cn%2Flarge%2F007CIlnsly1gsy2f5ecpyj312w0px7bm.jpg&refer=http%3A%2F%2Fwx3.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630576769&t=a79e037ed5dc29eb48f08d6cabfce17a",
									'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
									],
								'content': "“老人家您好，在洗菜啊，我是您的帮扶人可记得了，上次我和年富书记一起来的”。",
								'famType': '留守儿童户',
								'date': '2021-07-12'
							}
						},
						{
						    type: "到户联系",
						    volunteer: "派大星",
						    villager: "章鱼哥",
							district: '保靖县/*乡/B村',
							detail: {
								'photo': [
									"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.cdsfl.org.cn%2Fuploadfile%2F2017%2F0518%2F20170518092943459.jpg&refer=http%3A%2F%2Fwww.cdsfl.org.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630576268&t=e74980b8841d2724817aac02265cee1b",
									"https://img0.baidu.com/it/u=3615372845,2857033766&fm=26&fmt=auto&gp=0.jpg",
									'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
									],
								'content': "",
								'famType': '留守儿童户',
								'date': '2021-07-12'
							}
						}
                    ]

// 用户信息
const users = [
  {
    username: '530124197312202026',
	name: '海绵宝宝',
    password: '123456',
    photo: '',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    role: 'villager',
    rights: []
  },
  {
    username: '140421199007268321',
	name: '派大星',
    password: '123456',
    photo: '',
    token: 'eyJhbGciOiJIUzI1NiIsjdkRcCI6IkpXVCJ9',
    role: 'volunteer',
    rights: []
  },
  {
    username: '220300198606247467',
	name: '小蜗',
    password: '123456',
    photo: '',
    token: 'eyJhbGciOiJIUzI1NiIsppoiHCI6IkpXVCJ9',
    role: 'villageBranch',
    rights: []
  },
  {
    username: '432500196111092208',
	name: '章鱼哥',
    password: '123456',
    photo: '',
    token: 'eTuodFciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    role: 'townCommittee',
    rights: []
  },
  {
    username: '320202198606237382',
	name: '蟹老板',
    password: '123456',
    photo: '',
    token: 'eyJhbGciOiJIUJklofIsInR5cCI6IkpXVCJ9',
    role: 'countyCommittee',
    rights: []
  }
]

const tel_code = {
	'530124197312202026':[
		{
			username: '张三',
			tel: '15352236291',
			verifyCode: '9527',
			password: '',
		}
	]
}

// events
const events = {
	/*
	danger: 4,
	done: 55,
	ing: 60
	*/
   danger: 12,
   done: 55,
   ing: 60
}

// 用户登录
Mock.mock('/login', 'post', option => {
  const { username, password } = JSON.parse(option.body)
  const result = users.find(item => {
    return item.username === username && item.password === password
  })
  //console.log('login=>',result);
  if(result){
	  return result;
  }
  else{
	  return 'user_error';
  }
})

/*
// 获取表格信息
Mock.mock('/tabledata', 'get', () => {
  // 这里是获取session中token 然后验证token是否正确 如果不正确则不返回数据
  // 事实上，token此时应该由前端发送到后端，后端是无法直接获取前端session中token的
  const token = sessionStorage.getItem('token')
  // 由于这里是Mock数据 所以将用户的token在这里写死了 然后验证token是否正确
  if (token === 'admin-token' || token === 'student-token') {
    return tables
  } else {
    // 如果将session中token更改为错误的token 则展示这个信息
    alert('无效token')
    // 关闭弹出信息后返回401 之后通过响应拦截器跳转到登录页面
    return {
      status: 401
    }
  }
})
*/

// 验证码
Mock.mock('/verifyCode','post',option=>{
	const {tel} = JSON.parse(option.body)
	//console.log(tel)
	return {
		'tel': tel,
		code: '9527'
		//code: '-1'
	}
})

// 提交注册info
Mock.mock('/signUp','post',option=>{
	const info = JSON.parse(option.body)
	//console.log(option)
	//console.log(info);
	return {
		//data: info,
		// 后端判断身份证号是否已被注册
		//'identity_status': -1,
		'identity_status': 1,
		// 后端判断验证码是否一致,
		//'code_status': -1
		'code_status': 1
	}
})

// 路由导航守卫
// id === username === 身份证号
Mock.mock('/certification', 'post', option => {
  const { token, role, id } = JSON.parse(option.body)
  //console.log(role);
  const result = users.find(item => {
    return item.username === id && item.token === token && item.role === role
  })
  //console.log(result);
  if(result){
	  return 1;
  }
  else{
	  return 0;
  }
})

// 获取表格
Mock.mock('/getTable', 'get', ()=>{
	return tableData;
})

// 筛选获取表格
Mock.mock('/getTable', 'post', option => {
	//console.log(option.body);
  //const { param } = JSON.parse(option.body)
  const param = option.body;
  if(param===null){
	  return tableData; // 表格数据全部发回去
  }
  //console.log(param);
  const result = [];
  tableData.forEach((item, index)=>{
	  if(item.type===param){
		  result.push(item);
	  }
  })
  return result;
})

// edit页面上传的信息
Mock.mock('/edit', 'post', option => {
    //const body = JSON.parse(option.body);
	//console.log(body.file);
	//console.log(option);
	return true;
})

// 删除table-row数据
Mock.mock('/deleteTable', 'post', option => {
	//console.log(option.body);
	const body = JSON.parse(option.body);
	//console.log(body.id);
	return body.id;
})

// 首页的event事件数
Mock.mock('/getEvents', 'get', ()=>{
	return events;
})