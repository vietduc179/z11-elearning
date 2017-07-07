/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author vietduc
 */
@Entity
@Table(catalog = "z11_elearning", schema = "")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Rolepermission.findAll", query = "SELECT r FROM Rolepermission r")
    , @NamedQuery(name = "Rolepermission.findById", query = "SELECT r FROM Rolepermission r WHERE r.id = :id")
    , @NamedQuery(name = "Rolepermission.findByCreatedtime", query = "SELECT r FROM Rolepermission r WHERE r.createdtime = :createdtime")})
public class Rolepermission implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(nullable = false)
    private Integer id;
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdtime;
    @JoinColumn(name = "PMSCODE", referencedColumnName = "PMSCODE", nullable = false)
    @ManyToOne(optional = false)
    private Permission pmscode;
    @JoinColumn(name = "ROLECODE", referencedColumnName = "ROLECODE", nullable = false)
    @ManyToOne(optional = false)
    private Role rolecode;

    public Rolepermission() {
    }

    public Rolepermission(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getCreatedtime() {
        return createdtime;
    }

    public void setCreatedtime(Date createdtime) {
        this.createdtime = createdtime;
    }

    public Permission getPmscode() {
        return pmscode;
    }

    public void setPmscode(Permission pmscode) {
        this.pmscode = pmscode;
    }

    public Role getRolecode() {
        return rolecode;
    }

    public void setRolecode(Role rolecode) {
        this.rolecode = rolecode;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Rolepermission)) {
            return false;
        }
        Rolepermission other = (Rolepermission) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Rolepermission[ id=" + id + " ]";
    }
    
}
