function getDate(Project_dtl){
    let dateString1 = Project_dtl.FromDate;//11-feb-2002
   
    let dateString2 = Project_dtl.ToDate;//12-
    let dateObject1 = new Date(dateString1);
    let dateObject2 = new Date(dateString2);
    let monthNumber1 = dateObject1.getMonth();
    let monthNumber2 = dateObject2.getMonth();
    let dateNumber1 = dateObject1.getDate();
    let dateNumber2 = dateObject2.getDate();
    let monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    let monthName1 = monthNames[monthNumber1];
    let monthName2 = monthNames[monthNumber2];
    let useDate1 =0;
    let useDate2 =0;
    if(dateNumber1<=9){
        useDate1 = monthName1 + " " +"0" +dateNumber1 ;
    }
    else{
        useDate1 = monthName1 + " "+dateNumber1 ;
    }
    
    if(dateNumber2<=9){
        useDate2 = monthName2 + " " +"0" +dateNumber2 ;
    }
    else{
        useDate2 = monthName2 + " "+dateNumber2 ;
    }

    return {useDate1,useDate2,dateNumber1,dateNumber2}; 
  }

  
 module.exports ={
    getDate
 }