const Db = require("../Model/Db");
module.exports = {
    //Coding Convendion-CMMiS, ISO
    List:(req,res)=>{
        let sql = "SELECT * FROM ticket WHERE 1=1";
        Db.query(sql, (err, rs)=>{
            if(err) throw err
            res.render("./ticket/index.html",{"ticket":rs});

        })
    },
    // Phương thức Add
    Add: (req, res) => {
    res.render("./ticket/add.html");
    },

    // Phương thức AddNew
    AddNew:(req, res) => {
        const ticketcode = req.body.ticketcode;
        const ticketname = req.body.ticketname;
        
        const ticketcodeRegex = /^[A-Z]{2,4}$/;
        const ticketnameRegex = /^[A-Za-z]+$/;

            if(!ticketcodeRegex.test(ticketcode)) {
                res.send("Vui lòng điền đúng thông tin ticketCode");
            } else if(!ticketnameRegex.test(ticketname)) {
                res.send("Vui lòng điền đúng thông tin ticketName");
            } else {
                // Kiểm tra sự trùng lặp của mã Ticket (Code) và tên Ticker (Name) trong cơ sở dữ liệu
                function checkDuplicateTicker(ticketcode, ticketname, callback) {
                    const sql = 'SELECT COUNT(*) AS count FROM ticket WHERE ticketcode = ? OR ticketname = ?';
                    Db.query(sql, [ticketcode, ticketname], (err, results) => {
                    if (err) {
                        callback(err, null);
                        return;
                    }
                    const count = results[0].count;
                    callback(null, count > 0);
                    });
                }

                checkDuplicateTicker(ticketcode, ticketname, (err, isDuplicate) => {
                    if (err) {
                    console.error('Error:', err.message);
                    return;
                    }
                    if (isDuplicate) {
                        res.send("Dữ liệu này đã có.");
                    } else {
                        //Thực hiện insert data base
                        const sql = 'INSERT INTO ticket (ticketcode, ticketname) VALUES (?, ?)';
                        const values = [ticketcode, ticketname]; // đặt values cho ticket từ form nhập
                        
                        Db.query(sql, values, (err, rs) => {
                            if (err) {
                                console.error("Lỗi khi insert dữ liệu:", err);
                                res.send("Đã xảy ra lỗi khi insert dữ liệu.");
                            } else {
                                console.log("Number of records inserted: " + rs.affectedRows);
                                res.redirect("/ticket/Listing"); // Chỉ chuyển hướng đến '/ticket/Listing', không cần truyền dữ liệu
                            }
                        });

                    }
                });
            }

    }

}




