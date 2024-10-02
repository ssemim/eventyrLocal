import express, { response } from 'express';
import mysql from 'mysql';
import cors from 'cors';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser';
import { promisify } from 'util';


const salt = 10;


function checkTime(){
    let today = new Date(); // 시간 설정용 변수
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    
    var dateString = year + '-' + month  + '-' + day;
    
    var hours = ('0' + today.getHours()).slice(-2); 
    var minutes = ('0' + today.getMinutes()).slice(-2);
    var seconds = ('0' + today.getSeconds()).slice(-2); 
    
    var timeString = hours + ':' + minutes  + ':' + seconds;
    
    var recordedTime = dateString +" :: "+ timeString 

return recordedTime;
}

const app = express();

app.use(express.json());
app.use(cors({
    origin:["http://localhost:5173"],
    methods: ["POST","GET"],
    credentials: true
}));
app.use(cookieParser());

const db = mysql.createConnection({
    host: 'eventyr.cafe24app.com',
    user: 'sses1007',
    password:'whdTp0522!',
    database: 'sses1007',
    port:'3306'
});

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.json({Error:"로그인 후 사용 가능한 페이지 입니다."})
    }else{
        jwt.verify(token, "jwt-secret-key-password-pst", (err,decoded)=>{
        if(err){return res.json({Error:"올바르지 않은 접근입니다. QnA로 문의 주세요"}) //토큰 오류 발생시 멘트
    }else{
        req.id = decoded.id;
        req.name = decoded.name;
        req.position = decoded.position;
        req.oc_img = decoded.oc_img;
        req.stat = decoded.stat;
        req.heart = decoded.heart;
        req.rank = decoded.rank;
        req.friends = decoded.friends;
        req.badgeList = decoded.badgeList;
        req.secretCount = decoded.secretCount;
        req.music = decoded.music;
        next();
    }
})

    }

}



/*마이 페이지 서버단 코드 */
app.get('/mypage', verifyUser, async (req, res) => {
    const id = req.id;
    const loadingInvenSql = `SELECT * FROM inventory JOIN product ON inventory.product_id = product.product_id WHERE id = ?`;
    const loadingUsedInvenSql = `SELECT * FROM inventory_used WHERE id = ?`;
    const loadingPoint = `SELECT member_point FROM member WHERE id = ?`;

    // 프로미스를 반환하는 함수 정의
    const queryPromise = (sql, params) => {
        return new Promise((resolve, reject) => {
            db.query(sql, params, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    };

    try {
        // 두 개의 쿼리를 병렬로 실행
        const [inventoryResults, usedInventoryResults, loadingPointResult] = await Promise.all([
            queryPromise(loadingInvenSql, [id]),
            queryPromise(loadingUsedInvenSql, [id]),
            queryPromise(loadingPoint, [id])
        ]);

        // JSON 응답으로 두 쿼리의 결과를 반환
        res.json({
            Status: "Success",
            id: req.id, // 아이디
            name: req.name, // 이름
            music: req.music, // 플리
            position: req.position, // 포지션
            oc_img: req.oc_img, // 이미지
            stat: req.stat, // 스텟
            heart: req.heart, // 최대 체력
            rank: req.rank, // 랭크
            point: loadingPointResult[0]?.member_point || 0, // 포인트
            friends: req.friends, // 텍관목록
            badgeList: req.badgeList, // 뱃지 소유 목록
            secretCount: req.secretCount, // 기밀 갯수
            inventory: inventoryResults, // 인벤토리
            usedInventory: usedInventoryResults // 사용된 인벤토리
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: "서버에 데이터 전송 실패" });
    }
});



/* 아이템 사용 서버단 코드 */

app.post('/mypage', verifyUser, (req, res) => {
    const originNum = req.body.originNum;
    const id = req.id;
    const productName = req.body.productName;
    const inventoryDate = req.body.whendidyouB;
    const howmanyleft = req.body.howmanyleft;

    const sqlInsert = "INSERT INTO inventory_used (inventory_id, id, product_name, inventory_date, inventory_used_data) VALUES ?";
    const valuesInsert = [[originNum, id, productName, inventoryDate, checkTime()]];

    db.query(sqlInsert, [valuesInsert], (err, result) => {
       

        if (err) return res.json({ Error: "서버에 데이터 전송 실패" });
        
        // howmanyleft 값이 0인 경우
        if (howmanyleft === 0) {
            const sqlDelete = "DELETE FROM inventory WHERE inventory_id = ?";
            db.query(sqlDelete, [originNum], (err, result) => {
                if (err) return res.json({ Error: "서버에 데이터 삭제 실패" });
                console.log(howmanyleft)
                console.log("아이템이 삭제되다...")
                return res.json({ Status: "Success", Message: "행이 삭제되었습니다." });
            });
        } else {
            // howmanyleft 값이 0이 아닌 경우
            const sqlUpdate = "UPDATE inventory SET count = count - 1 WHERE inventory_id = ?";
            db.query(sqlUpdate, [originNum], (err, result) => {
                if (err) return res.json({ Error: "서버에 데이터 업데이트 실패" });
                console.log(howmanyleft)
                console.log("숫자값이 떨어지다...")
           
                return res.json({ Status: "Success", Message: "count 값이 감소되었습니다." });
            });
        }
    });
});



/* 회원가입 서버단 코드 */

app.post('/register', (req,res)=>{
    const sql = "INSERT INTO member (`id`,`name`,`password`) VALUES (?)"
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if(err) return res.json({Error:"비밀번호 해싱에 에러가 발생했습니다."});

        const values = [
            req.body.id,
            req.body.name,
            hash
        ]

        db.query(sql,[values],(err,result)=>{
            if(err) return res.json({Error: "서버에 데이터 전송 실패" })
            return res.json({Status: "Success"})
        })
    })
  
})

/* 로그인 서버단 코드 */


app.post('/login', (req, res) => {
    const sql = "SELECT * FROM member WHERE id = ?";
    db.query(sql, [req.body.id], (err, data) => {
        if(err) return res.json({Error:"서버상에서 로그인 에러가 발생했습니다."});
        if( data.length> 0 ){
            bcrypt.compare(req.body.password.toString(), data[0].password, (err,response) => {
                if(err) return res.json({Error: "패스워드 해독 에러 발생"});
                    if(response){


                        const id = data[0].id; //아이디

                        const name = data[0].name; // 이름
                        const position = data[0].oc_class; // 포지션
                        const oc_img = data[0].oc_img; // 이미지 

                        const stat = data[0].oc_stat; // 스텟

                        const heart = data[0].oc_heart; // 최대 체력
                        const rank = data[0].oc_rank; // 랭크
                    
                        const badgeList = data[0].member_badge; //소지중인 뱃지
                        const friends = data[0].member_connection // 텍관목록 출력

                        const secretCount = data[0].secret; //기밀 갯수 
                        const music = data[0].playlist; // 플레이 리스트


                        const token = jwt.sign({id, name, position, oc_img, stat, heart, rank, badgeList, friends ,music, secretCount}, "jwt-secret-key-password-pst", {expiresIn:'8h'}) //가운데 문자열 비번 수정 + 세션 만료 시간 : 2시간
                        res.cookie('token', token);
                        return res.json({Status:"Success"});
                    }else{
                        return res.json({Error:"비밀번호가 일치하지 않습니다."});
                    }
            })
        
        } else {
            return res.json({Error:"아이디가 존재하지 않습니다."});
        }
    })
})


/*로그아웃 서버단 코드*/
app.get('/logout', (req,res)=>{
    res.clearCookie('token');
    return res.json({Status:"Success"})
})


/* 상점 서버단 코드  불러오는 쪽*/

app.get('/shop', verifyUser, (req, res) => {
    const sql = "SELECT member_point FROM member WHERE id = ?";
    db.query(sql, [req.id], (err, data) => { 
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ Status: "Error", Error: "Internal server error" });
        }
        
        if (data.length === 0) {
            console.error('No data found for id:', req.body.id);
            return res.status(404).json({ Status: "Error", Error: "Data not found" });
        }
        
        const point = data[0]?.member_point; // 첫 번째 행의 member_point 값을 가져옴
        return res.json({
            Status: "Success", 
            id: req.id, // 아이디
            name: req.name, // 이름
            point: point || 0, // 포인트 (값이 없을 경우 기본값으로 0 사용)
        });
    });
});

const query = promisify(db.query).bind(db);
const beginTransaction = promisify(db.beginTransaction).bind(db);
const commit = promisify(db.commit).bind(db);
const rollback = promisify(db.rollback).bind(db);

app.post('/shop', verifyUser, verifyUser, async (req, res) => {
    var id = req.id;
    var { itemCart, changedPoint } = req.body;

    console.log('User ID:', id);

    // 기본 쿼리들
    const initialQueries = [
        `select * from product;`,
        `select * from inventory join product on inventory.product_id = product.product_id where id = '${id}';`,
        `UPDATE member SET member_point = ${changedPoint} WHERE id = '${id}';`,
        `select product_id, count from inventory where id = '${id}';`,
    ];

    // 사용자 데이터 기반 쿼리 추가
    const PurchasedItemQueries = [];

    // itemCart 배열 순회하면서 SQL 쿼리 생성
    for (const item of itemCart[0]) {
        PurchasedItemQueries.push(`insert into inventory (id, product_id, inventory_date, count) VALUES ('${id}','${item.id}', '${checkTime()}', ${item.count})`);
        console.log("Adding item to inventory:", item);
    }

    // 전체 쿼리 배열
    const queries = [...initialQueries, ...PurchasedItemQueries];

    try {
        await beginTransaction();
        console.log('Transaction started');

        for (const queryStr of queries) {
            console.log('Executing query:', queryStr);
            await query(queryStr);
            console.log("Query executed successfully");
        }

        await commit();
        console.log("Transaction committed");
        return res.json({ Status: "SuccessGood" });

    } catch (error) {
        await rollback();
        console.error('Transaction error:', error);
        return res.json({ Error: "트랜잭션 실패", message: error.message });
    }
});



/* 상점 서버단 상품 구매 코드 */


app.listen(8081,()=>{
    console.log("Running at...")
})