/**
 * 文章
 *   - 标题
 *   - 作者
 *   - 时间
 *   ......
 */

const db = require('./db.js')

class Post{
   // 当我们new Post(title,author)时执行constructor
   constructor(id,slug,title,excerpt,content,type,status,comment_status,comment_count,view_count,create,modified,user_id,parent_id){
      // super() // 如果继承某个父级，就必需加上super(),如果不也constructor这个函数，就可以不加super()
      this.id = id
      this.slug = slug
      this.title = title
      this.excerpt = excerpt
      this.content = content
      this.type = type
      this.status = status
      this.comment_status = comment_status
      this.comment_count = comment_count
      this.view_count = view_count
      this.create = create
      this.modified = modified
      this.user_id = user_id
      this.parent_id = parent_id
   }

   // 获取文章列表 , static find(){} 是定义一个find静态方法
   static find(){
      // 假设已经操作数据库获取了数据
      // let obj = {title:'我是中国人',author:'小明',date:'2015-1-1'}
      // 有可能是从数据库读取.
      let obj = require('../controllers/posts.json')
      // console.log(typeof obj);
      // let obj = tmp[0]  
      return obj //
      // return  new Post(obj.id,obj.slug,obj.title,obj.excerpt,obj.content,obj.type,obj.status,obj.comment_status,obj.comment_count,obj.view_count,obj.create,obj.modified,obj.user_id,obj.parent_id)
   }

// 获取分页的数据,page:当前页
  static findPage(page,callback){

      let start= 0 // 从第几条数据开始选择
      let pageSize = 2 // 每页显示的条数
      // reqiure有缓存，只读取一次,下一次直接从内存中获取
      // let obj = require('../controllers/posts.json')
      // 现在要从数据库中读取数据

      // # （page-1)*pageSize ,pageSize ,page 3,pageSize,2
      //  
      let sql = 'select * from posts  limit ?,?'

      let tmp = []

      db.query(sql,[(page-1)*pageSize,pageSize],(err, rows) => {
         // console.log(rows);

         // 调用
         callback(rows)
      })

      // forEach(function(item){
      //    return item
      // })




      // let tmpObj = obj
      // 深拷贝

      // page=1,  0  0,1,2,3,4
      // page=2,  5  5,6,7,8,9
      // page=3,  10 10,11,12,13,14
      // start = (page-1)*pageSize
      // // arr  1,2,3,4,5,6,7,8,9,10    3
      // // page = 1： 1,2,3      []
      // // let arr = obj.splice(0,3)
      // // console.log(obj.length);
      // // concat 拼接数据
      // // Object.assign
      // let tmpObj = [].concat(obj,[])
      // console.log(tmpObj); //
      // let arr = tmpObj.splice(start,pageSize)
      // return arr
  }

  // 用来创建实例对象
  static create({id,slug,title,excerpt,content,type,status,comment_status,comment_count,view_count,create,modified,user_id,parent_id}){
      return new Post(id,slug,title,excerpt,content,type,status,comment_status,comment_count,view_count,create,modified,user_id,parent_id)
  }
  // 根据用户id和博客的slug得到数据
  static findOne(user_id,slug , callback){
    db.query(
      'select * from posts where user_id = ? and slug = ?',
      [user_id,slug] ,
      (err, rows) => {
        if(err) return typeof callback === 'function' && callback(err)

        // if(rows.length <=0){
        //   typeof callback === 'function' && callback(null, null)
        //   22
        // }else{
        //   typeof callback === 'function' && callback(null , rows.map(Post.create))
        //  }
         // rows.map(function(item){
         //   return Post.create(item)
         // })
         typeof callback === 'function' && (rows.length<=0 && callback(null, null) || rows.length==1 && callback(null, Post.create(rows[0])))
         // var a=1 , b
         // if(a==1 || b=2)
      }
      )
  }
 }
 


// function Post(title, author, data){
//      this.title = title
//       this.author = author
//       this.date = date
// }

 // 实例方法
 //   // - 实例对象调用


 // 静态方法(根具体对象没有太大关系)
    // - 是通过构建函数调用
 // exports default Post
 module.exports = Post