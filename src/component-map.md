## APPLICATION

### Parent

- null

### Children

- DayList
- AppointmentList

### State

### Prop

- null

---

## DAYLIST

### Parent

- Application

### Children

- DayListItem

### State

### Prop

## APPOINTMENT LIST

### Parent

- Application

### Children

- AppointmentListItem (not called this exactly in implementation - called "Appointment")

### State

### Prop

---

### APPOINTMENT LIST ITEM aka APPOINTMENT

### Parent

- AppointmentList

### Children

- Header
- Empty
- Show
- Error
- Form
- Confirm
- Status

### State

### Prop

---

### HEADER

### Parent

- Appointment

### Children

- null

### State

- null

### Props

- time
