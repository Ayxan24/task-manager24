package com.example.taskmanager.model;

public class Date implements Comparable<Date> {
    private int day;
    private int month;
    private int year;
    
    public Date(){
        this(1, 1, 1970); // Default date
    }
    public Date(int day, int month, int year){
        setDay(day);
        setMonth(month);
        setYear(year);
    }
    public Date(Date date){
        setDay(date.day);
        setMonth(date.month);
        setYear(date.year);
    }
    
    public void setDay(int day){
        if (day < 0){
            this.day = 0;
        }
        else if (day > 31){
            this.day = 31;
        }
        else{
            this.day = day;
        }
    }

    public void setMonth(int month){
        if (month < 0){
            this.month = 0;
        }
        else if (month > 12){
            this.month = 12;
        }
        else{
            this.month = month;
        }
    }

    public void setYear(int year){
        if (year < 0){
            this.year = 0;
        }
        else{
            this.year = year;
        }
    }

    public int getDay(){
        return this.day;
    }
    public int getMonth(){
        return this.month;
    }
    public int getYear(){
        return this.year;
    }
    public String toString(){
        return day + "-" + month + "-" + year;
    }
    public int compareTo(Date other){
        if (this.year != other.year) {
            return Integer.compare(this.year, other.year);
        } else if (this.month != other.month) {
            return Integer.compare(this.month, other.month);
        } else {
            return Integer.compare(this.day, other.day);
        }
    }
    @Override
    public boolean equals(Object obj){
        if (this == obj) return true;
        if (!(obj instanceof Date)) return false;
        Date other = (Date) obj;
        return this.day == other.day && this.month == other.month && this.year == other.year;
    }
    @Override
    public int hashCode(){
        int result = Integer.hashCode(day);
        result = 31 * result + Integer.hashCode(month);
        result = 31 * result + Integer.hashCode(year);
        return result;
    }
}
