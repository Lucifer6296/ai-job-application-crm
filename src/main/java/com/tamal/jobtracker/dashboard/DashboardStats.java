package com.tamal.jobtracker.dashboard;

public class DashboardStats {

    private long total;
    private long applied;
    private long interview;
    private long rejected;
    private long selected;

    public DashboardStats(
            long total,
            long applied,
            long interview,
            long rejected,
            long selected){
        this.total = total;
        this.applied = applied;
        this.interview = interview;
        this.rejected = rejected;
        this.selected = selected;
    }
    public long getTotal() {
        return total;
    }
    public long getApplied(){
        return applied;
    }
    public long getInterview() {
        return interview;
    }
    public long getRejected() {
        return rejected;
    }
    public long getSelected() {
        return selected;
    }


}
